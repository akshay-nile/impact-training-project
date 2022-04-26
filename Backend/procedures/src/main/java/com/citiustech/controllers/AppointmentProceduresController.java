package com.citiustech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.AppointmentProcedures;
import com.citiustech.models.Procedure;
import com.citiustech.services.ProcedureService;

@CrossOrigin
@RestController
@RequestMapping("/procedures/api")
public class AppointmentProceduresController {

	@Autowired
	private ProcedureService procedureService;

	@GetMapping("/appointment-procedures/{appointmentId}")
	public ResponseEntity<?> getProcedureByAppointmentId(@PathVariable int appointmentId) {
		List<Procedure> procedureList = procedureService.getProceduresByAppointmentId(appointmentId);
		return new ResponseEntity<>(procedureList, HttpStatus.OK);
	}

	@PostMapping("/appointment-procedures")
	public ResponseEntity<?> addProceduresForAppointment(@RequestBody AppointmentProcedures appointmentProcedures) {
		AppointmentProcedures addedAppointmentProcedures = procedureService
				.addProceduresForAppointment(appointmentProcedures);
		return new ResponseEntity<>(addedAppointmentProcedures, HttpStatus.OK);
	}
}
