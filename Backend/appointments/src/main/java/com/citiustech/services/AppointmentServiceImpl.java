package com.citiustech.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Appointment;
import com.citiustech.models.TimeSlot;
import com.citiustech.repositories.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Override
	public Appointment getAppointmentByAptId(int aptId) {
		return appointmentRepo.findById(aptId).get();
	}

	@Override
	public List<Appointment> getAppointments() {
		List<Appointment> appointments = appointmentRepo.findByOrderByAptDate();
		List<Appointment> aptList = new ArrayList<>();
		for (Appointment apt : appointments) {
			if (apt.getAptDate().isAfter(java.time.LocalDate.now())
					|| apt.getAptDate().equals(java.time.LocalDate.now())) {
				aptList.add(apt);
			}
		}
		return aptList;

	}

	@Override
	public Appointment addAppointment(Appointment apt) {
		return appointmentRepo.save(apt);
	}

	@Override
	public Appointment deleteAppointment(int aptId) {
		Appointment appintment = appointmentRepo.findById(aptId).orElse(null);
		if (appintment != null) {
			appointmentRepo.deleteById(aptId);

		}
		return appintment;
	}

	@Override
	public int getEmployeeId(String physicianEmail) {
		return appointmentRepo.getEmployeeId(physicianEmail);
	}

	@Override
	public List<Map<String, String>> getCalendarAppointments() {
		List<Appointment> appointmentList = (List<Appointment>) appointmentRepo.findAll();

		List<Map<String, String>> eventList = new ArrayList<>();
		for (Appointment apt : appointmentList) {
			Map<String, String> mapEvent = new HashMap<>();
			mapEvent.put("title", apt.getMeetingTitle());
			mapEvent.put("start", formatTimeslot(apt.getAptDate(), apt.getTime().split(" to ")[0].trim()));
			mapEvent.put("end", formatTimeslot(apt.getAptDate(), apt.getTime().split(" to ")[1].trim()));
			eventList.add(mapEvent);
		}

		return eventList;
	}

	private String formatTimeslot(LocalDate localDate, String localTime) {
		String dateTime = localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + "T";
		dateTime += LocalTime.parse(localTime, TimeSlot.timeFormat).format(DateTimeFormatter.ofPattern("HH:mm:ss"));
		return dateTime;
	}

	@Override
	public List<Appointment> getpastAppointments(String patientEmail) {
		List<Appointment> appointments = appointmentRepo.findByPatientEmailAndIsDataCollectionApptAndDataStatus(patientEmail,false,true);
		List<Appointment> aptList = new ArrayList<>();
		for (Appointment apt : appointments) {
			if (apt.getAptDate().isBefore(java.time.LocalDate.now())) {
				aptList.add(apt);
			}
		}
		return aptList;

	}

	@Override
	public List<Appointment> upcomingAppointments(String patientEmail) {
		List<Appointment> appointments = appointmentRepo.findByPatientEmail(patientEmail);
		List<Appointment> aptList = new ArrayList<>();
		for (Appointment apt : appointments) {
			if (apt.getAptDate().isAfter(java.time.LocalDate.now())
					|| apt.getAptDate().equals(java.time.LocalDate.now())) {
				aptList.add(apt);
			}
		}
		return aptList;
	}

	@Override
	public List<Map<String, String>> getCalendarAppointmentsByPatientEmail(String email) {
		List<Appointment> appointmentList = (List<Appointment>) appointmentRepo.findByPatientEmail(email);

		List<Map<String, String>> eventList = new ArrayList<>();
		for (Appointment apt : appointmentList) {
			Map<String, String> mapEvent = new HashMap<>();
			mapEvent.put("title", apt.getMeetingTitle());
			mapEvent.put("start", formatTimeslot(apt.getAptDate(), apt.getTime().split(" to ")[0].trim()));
			mapEvent.put("end", formatTimeslot(apt.getAptDate(), apt.getTime().split(" to ")[1].trim()));
			eventList.add(mapEvent);
		}

		return eventList;
	}

	@Override
	public List<String> getAppointmentsMeetingTitle(String patientEmail) {
		return appointmentRepo.getAppointmentsMeetingTitle(patientEmail,true,false);
	}

}
