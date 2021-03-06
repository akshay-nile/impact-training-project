package com.citiustech.controllers;

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

import com.citiustech.models.Vital;
import com.citiustech.services.VitalService;

@CrossOrigin
@RestController
@RequestMapping("/patient-visits/vitals")
public class VitalController {
	
	@Autowired
	private VitalService vitalService;

	@GetMapping("/vitalId/{vitalId}")
	public ResponseEntity<?> getVitalDetailsById(@PathVariable int vitalId) {
		Vital vital = vitalService.getVitalDetailsByAptId(vitalId);
		if (vital != null) {
			return new ResponseEntity<>(vital, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@GetMapping("/appointment/{appointmentId}")
	public ResponseEntity<?> getVitalDetailsByAppointmentId(@PathVariable int appointmentId) {
		Vital vital = vitalService.getVitalDetailsByAppointmentId(appointmentId);
		return new ResponseEntity<>(vital, HttpStatus.OK);
	}

	@PostMapping("")
	public ResponseEntity<?> saveVitalDetails(@RequestBody Vital vital) {
		Vital vitalObj = vitalService.saveVitalDetails(vital);
		if (vitalObj != null) {
			return new ResponseEntity<>(vitalObj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@PutMapping("")
	public ResponseEntity<?> updateVitalDetails(@RequestBody Vital vital) {
		System.out.println(vital.getVitalId());

		Vital vitalObj = vitalService.saveVitalDetails(vital);
		if (vitalObj != null) {
			return new ResponseEntity<>(vitalObj, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@DeleteMapping("/{vitalId}")
	public ResponseEntity<?> deleteVitalDetails(@PathVariable int vitalId) {
		Vital vital = vitalService.deleteVitalDetails(vitalId);
		if (vital != null) {
			return new ResponseEntity<>(vital, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
