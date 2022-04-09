package com.citiustech.controller;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.model.Appointment;
import com.citiustech.service.AppointmentService;

@CrossOrigin
@RestController
@RequestMapping("/appointments/api")
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;

	@GetMapping("/getAllAppointments")
	public ResponseEntity<?> getAllAppointments() {
		List<Appointment> appointments = appointmentService.getAppointments();
		if (appointments.size() != 0) {
			return new ResponseEntity<>(appointments, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/getCalendarAppointments")
	public ResponseEntity<?> getCalendarAppointments() {
		List<Map<String, String>> appointments = appointmentService.getCalendarAppointments();
		if (appointments.size() != 0) {
			return new ResponseEntity<>(appointments, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/{aptId}")
	public ResponseEntity<?> geAppointmentById(@PathVariable int aptId) {
		Appointment appointment = appointmentService.getAppointmentByAptId(aptId);
		if (appointment != null) {
			return new ResponseEntity<>(appointment, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/physicianEmail/{email}")
	public ResponseEntity<?> getEmployeeId(@PathVariable String email) {
		return new ResponseEntity<>(appointmentService.getEmployeeId(email), HttpStatus.OK);
	}

	@GetMapping("/timeslots/{physicianEmail}/{aptDate}")
	public ResponseEntity<?> geAppointmentById(@PathVariable String physicianEmail, @PathVariable String aptDate)
			throws ParseException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
		LocalDate date = LocalDate.parse(aptDate, formatter);
		System.out.println(physicianEmail);
		System.out.println(date);
		List<String> appointment = appointmentService.getAvailableTimeSlots(physicianEmail, date);
		System.out.println(appointment);
		if (appointment.size() != 0) {
			return new ResponseEntity<>(appointment, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("")
	public ResponseEntity<?> saveAppointment(@RequestBody Appointment appointment) {
		Appointment appointmentObj = appointmentService.saveAppointment(appointment);
		if (appointmentObj != null) {
			return new ResponseEntity<>(appointmentObj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PutMapping("")
	public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
		System.out.println(appointment.getTime());
		Appointment appointmentObj = appointmentService.saveAppointment(appointment);
		if (appointmentObj != null) {
			return new ResponseEntity<>(appointmentObj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@DeleteMapping("/{aptId}")
	public ResponseEntity<?> deleteAppointment(@PathVariable int aptId) {
		Appointment appointmentObj = appointmentService.deleteAppointment(aptId);
		if (appointmentObj != null) {
			return new ResponseEntity<>(appointmentObj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
