package com.citiustech.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.citiustech.models.Appointment;

@Service
public class EmailSenderService implements Runnable {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private RestTemplate restTemplate;

	private Stack<SimpleMailMessage> stack = new Stack<SimpleMailMessage>();

	public Thread sendEmail(String toEmail, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("CTHospitalO@gmail.com");
		message.setTo(toEmail);
		message.setSubject(subject);
		message.setText(body);
		stack.push(message);

		Thread emailSenderThread = new Thread(this);
		emailSenderThread.start();
		return emailSenderThread;
	}

	@Override
	public void run() {
		SimpleMailMessage message = stack.pop();
		try {
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String getActioner(Appointment appointment) {
		if (appointment.getEditedBy().startsWith("P")) {
			return "PATIENT";
		}
		if (appointment.getEditedBy().equals(appointment.getEmployeeId())) {
			return "DOCTOR";
		} else {
			return "NURSE";
		}
	}

	public boolean sendNotificationEmail(Appointment appointment) {
		// Request content ready
		Map<String, String> map = new HashMap<>();
		map.put("patientId", appointment.getPatientId());
		map.put("employeeId", appointment.getEmployeeId());

		// Request headers ready
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// Body created from headers and content
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(map, headers);

		// Calling hospital microservice api and storing response
		String url = "http://localhost:8082/hospital/get-emails-from-ids";
		map = restTemplate
				.exchange(url, HttpMethod.POST, entity, new ParameterizedTypeReference<Map<String, String>>() {
				}).getBody();

		String subject, body, sendTo;

		switch (appointment.getStatus()) {
		case PENDING:
			subject = "New Appointment Requested";
			body = "Appointment has been " + appointment.getEditHistory();
			sendTo = map.get("employeeId");
			sendEmail(sendTo, subject, body);
			break;
		case ACCEPTED:
			subject = "Appointment Confirmed";
			body = "Appointment has been " + appointment.getEditHistory();
			sendEmail(map.get("patientId"), subject, body);
			if (getActioner(appointment).equals("NURSE")) {
				sendEmail(map.get("employeeId"), subject, body);
			}
			break;
		case CANCELLED:
			subject = "Appointment Cancelled";
			body = "Appointment has been " + appointment.getEditHistory();
			if (getActioner(appointment).equals("PATIENT")) {
				sendEmail(map.get("employeeId"), subject, body);
			} else if (getActioner(appointment).equals("DOCTOR")) {
				sendEmail(map.get("patientId"), subject, body);
			} else if (getActioner(appointment).equals("NURSE")) {
				sendEmail(map.get("patientId"), subject, body);
				sendEmail(map.get("employeeId"), subject, body);
			}
			break;
		case ATTENDED:
			if (appointment.getDataCollectionStatus()) {
				subject = "Appointment Report Available";
				body = "Data Collection Report for the appointment titled as (" + appointment.getTitle()
						+ ") is now available for download.\n" + "Kindly login to your account and get the report.";
				sendEmail(map.get("patientId"), subject, body);
			}
			break;
		default:
			String status = appointment.getStatus().toString().replace("_", " ");
			subject = "Appointment " + status;
			if (status.equals("EXPIRED")) {
				body = "Appointment has been expired because it was not accepted by CT Hospital staff.";
			} else {
				body = "Appointment has been marked as 'Not Attended' because patient did not visit the CT Hospital.";
			}
			sendEmail(map.get("patientId"), subject, body);
			sendEmail(map.get("employeeId"), subject, body);
		}

		return false;
	}

}