package com.citiustech.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Appointment;
import com.citiustech.models.VisitReport;
import com.citiustech.services.VisitService;

@CrossOrigin
@RestController
@RequestMapping("/patient-visits/visit")
public class VisitController {
	@Autowired
	private VisitService visitService;

	@PostMapping("/getVisitReport")
	public ResponseEntity<?> getVisitReport(@RequestBody Appointment apt) {
		VisitReport report = visitService.getVisitReport(apt);
		if (report!= null) {
			return new ResponseEntity<>(report, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
