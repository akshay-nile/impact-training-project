package com.citiustech.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Appointment;
import com.citiustech.services.AppointmentService;

@CrossOrigin
@RestController
@RequestMapping("/appointments/api")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@GetMapping("/get-all")
	public ResponseEntity<?> getAllAppointments() {
		List<Appointment> appointments = appointmentService.getAppointments();
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	@GetMapping("/calendar-appointments")
	public ResponseEntity<?> getCalendarAppointments() {
		List<Map<String, String>> appointments = appointmentService.getCalendarAppointments();
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	@GetMapping("/calendar-appointments/{id}")
	public ResponseEntity<?> getCalendarAppointmentsById(@PathVariable String id) {
		List<Map<String, String>> appointments = null;
		if (id.startsWith("P")) {
			appointments = appointmentService.getCalendarAppointmentsByPatientId(id);
		} else if (id.startsWith("E")) {
			appointments = appointmentService.getCalendarAppointmentsByEmployeeId(id);
		}
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}
	
	@GetMapping("/get-appointments/{id}")
	public ResponseEntity<?> getAppointmentsById(@PathVariable String id) {
		List<Appointment> appointments = List.of();
		if (id.startsWith("P")) {
			appointments = appointmentService.geAppointmentsByPatientId(id);
		} else if (id.startsWith("E")) {
			appointments = appointmentService.getAppointmentsByEmployeeId(id);
		}
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	@GetMapping("/get-appointment/{appointmentId}")
	public ResponseEntity<?> getAppointmentById(@PathVariable int appointmentId) {
		Appointment appointment = appointmentService.getAppointmentById(appointmentId);
		return new ResponseEntity<>(appointment, HttpStatus.OK);
	}

	@GetMapping("/past-appointments/{id}")
	public ResponseEntity<?> getPastAppointmentsById(@PathVariable String id) {
		List<Appointment> appointments = null;
		if (id.startsWith("P")) {
			appointments = appointmentService.getPastAppointmentsByPatientId(id);
		} else if (id.startsWith("E")) {
			appointments = appointmentService.getPastAppointmentsByEmployeeId(id);
		}
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}
	
	@GetMapping("/past-appointments")
	public ResponseEntity<?> getAllPastAppointments() {
		List<Appointment> appointments = appointmentService.getAllPastAppointments();
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	@GetMapping("/upcoming-appointments/{patientId}")
	public ResponseEntity<?> upcomingAppointments(@PathVariable String patientId) {
		List<Appointment> appointments = appointmentService.getUpcomingAppointments(patientId);
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	@PostMapping("/add-appointment")
	public ResponseEntity<?> addAppointment(@RequestBody Appointment appointment) {
		Appointment addedAppointment = appointmentService.addAppointment(appointment);
		return new ResponseEntity<>(addedAppointment, HttpStatus.OK);
	}

	@PutMapping("/update-appointment")
	public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
		Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
		return new ResponseEntity<>(updatedAppointment, HttpStatus.OK);
	}

	@GetMapping("/get-meeting-titles/{patientId}")
	public ResponseEntity<?> getAppointmentsMeetingTitles(@PathVariable String patientId) {
		List<String> meetingTitles = appointmentService.getAppointmentsMeetingTitles(patientId);
		return new ResponseEntity<>(meetingTitles, HttpStatus.OK);
	}

	// Keeping Tejas' old code below as it is...

	@GetMapping("/physicianEmail/{email}")
	public ResponseEntity<?> getEmployeeId(@PathVariable String email) {
		return new ResponseEntity<>(appointmentService.getEmployeeId(email), HttpStatus.OK);
	}

}
