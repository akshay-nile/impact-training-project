package com.citiustech.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Appointment;
import com.citiustech.models.TimeSlot;
import com.citiustech.models.constants.Status;
import com.citiustech.repositories.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Autowired
	private EmailSenderService emailSender;

	@Override
	public List<Appointment> getAppointments() {
		List<Appointment> appointments = appointmentRepo.findByOrderByDateDesc();
		return statusFilter(appointments);
	}

	@Override
	public Appointment getAppointmentById(int appointmentId) {
		return appointmentRepo.findById(appointmentId).orElse(null);
	}

	@Override
	public Appointment addAppointment(Appointment appointment) {
		if (!appointmentRepo.existsByPatientIdAndEmployeeIdAndDateAndTime(appointment.getPatientId(),
				appointment.getEmployeeId(), appointment.getDate(), appointment.getTime())) {
			Appointment addedAppointment = appointmentRepo.save(appointment);
			emailSender.sendNotificationEmail(addedAppointment);
			return addedAppointment;
		}
		return null;
	}

	@Override
	public Appointment updateAppointment(Appointment appointment) {
		if (appointmentRepo.existsById(appointment.getAppointmentId())) {
			Appointment updatedAppointment = appointmentRepo.save(appointment);
			emailSender.sendNotificationEmail(updatedAppointment);
			return updatedAppointment;
		}
		return null;
	}

	private List<Map<String, String>> toCalendarFormat(List<Appointment> appointments) {
		return appointments.stream().map(a -> {
			TimeSlot timeSlot = TimeSlot.fromString(a.getTime());
			Map<String, String> event = new HashMap<>();
			event.put("title", a.getTitle());
			event.put("start", formatDateTime(a.getDate(), timeSlot.startsAt));
			event.put("end", formatDateTime(a.getDate(), timeSlot.endsAt));
			return event;
		}).collect(Collectors.toList());
	}

	private String formatDateTime(LocalDate localDate, LocalTime localTime) {
		String date = localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		String time = localTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
		return date + "T" + time;
	}

	@Override
	public List<Map<String, String>> getCalendarAppointments() {
		List<Appointment> appointments = (List<Appointment>) appointmentRepo.findAll();
		return toCalendarFormat(appointments);
	}

	@Override
	public List<Map<String, String>> getCalendarAppointmentsByPatientId(String patientId) {
		List<Appointment> appointments = appointmentRepo.findByPatientIdOrderByDateDesc(patientId);
		return toCalendarFormat(appointments);
	}

	@Override
	public List<Map<String, String>> getCalendarAppointmentsByEmployeeId(String employeeId) {
		List<Appointment> appointments = appointmentRepo.findByEmployeeIdOrderByDateDesc(employeeId);
		return toCalendarFormat(appointments);
	}

	@Override
	public List<Appointment> getUpcomingAppointments(String patientId) {
		LocalDate today = LocalDate.now();
		List<Appointment> appointments = appointmentRepo.findByPatientIdOrderByDateDesc(patientId);
		return statusFilter(
				appointments.stream().filter(a -> !a.getDate().isBefore(today)).collect(Collectors.toList()));
	}

	@Override
	public List<String> getAppointmentsMeetingTitles(String patientId) {
		return appointmentRepo.getAppointmentsMeetingTitles(patientId, true, false);
	}

	@Override
	public int getEmployeeId(String physicianEmail) {
		return appointmentRepo.getEmployeeId(physicianEmail);
	}

	@Override
	public List<Appointment> geAppointmentsByPatientId(String patientId) {
		return statusFilter(appointmentRepo.findByPatientIdOrderByDateDesc(patientId));
	}

	@Override
	public List<Appointment> getAppointmentsByEmployeeId(String employeeId) {
		return statusFilter(appointmentRepo.findByEmployeeIdOrderByDateDesc(employeeId));
	}

	private List<Appointment> statusFilter(List<Appointment> appointments) {
		LocalDateTime currentInstance = LocalDateTime.now();
		for (Appointment appointment : appointments) {

			LocalDateTime startInstance = LocalDateTime.of(appointment.getDate(),
					TimeSlot.fromString(appointment.getTime()).startsAt);

			LocalDateTime endInstance = LocalDateTime.of(appointment.getDate(),
					TimeSlot.fromString(appointment.getTime()).endsAt);

			if (startInstance.isBefore(currentInstance) && appointment.getStatus().equals(Status.PENDING)) {
				appointment.setStatus(Status.EXPIRED);
				appointmentRepo.save(appointment);
			} else if (currentInstance.isAfter(endInstance) && appointment.getStatus().equals(Status.ACCEPTED)) {
				appointment.setStatus(Status.NOT_ATTENDED);
				appointmentRepo.save(appointment);
			}
		}
		return appointments;
	}

	@Override
	public List<Appointment> getAllPastAppointments() {
		return statusFilter(
				appointmentRepo.findByIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(false, true));
	}

	@Override
	public List<Appointment> getPastAppointmentsByPatientId(String patientId) {
		return appointmentRepo.findByPatientIdAndIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(patientId,
				false, true);
	}

	@Override
	public List<Appointment> getPastAppointmentsByEmployeeId(String employeeId) {
		return appointmentRepo.findByEmployeeIdAndIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(employeeId,
				false, true);
	}
}
