package com.citiustech.controller;

import java.util.List;

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

import com.citiustech.model.Vital;
import com.citiustech.service.VitalService;

@CrossOrigin
@RestController
@RequestMapping("/patient-visits/vitals")
public class VitalController {
	@Autowired
	private VitalService vitalService;

	@GetMapping("/getAllVitalDetails")
	public ResponseEntity<?> getAllVitalDetails() {
		List<Vital> vitals = vitalService.getVitalDetails();
		if (vitals.size() != 0) {
			return new ResponseEntity<>(vitals, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/vitalId/{vitalId}")
	public ResponseEntity<?> getVitalDetailsById(@PathVariable int vitalId) {
		Vital vital = vitalService.getVitalDetailsByAptId(vitalId);
		if (vital != null) {
			return new ResponseEntity<>(vital, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@GetMapping("/aptId/{aptId}")
	public ResponseEntity<?> getVitalDetailsByAptId(@PathVariable int aptId) {
		System.out.println(aptId);
		Vital vital = vitalService.getVitalDetailsByPatientId(aptId);
		if (vital != null) {
			return new ResponseEntity<>(vital, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
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
