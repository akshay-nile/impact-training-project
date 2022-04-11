package com.citius.controller;

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

import com.citius.model.Medication;
import com.citius.service.MedicationService;

@CrossOrigin
@RestController
@RequestMapping("/api/medication")
public class MedicationController {

	@Autowired
	private MedicationService medicationService;
	
	@GetMapping("/getAllMedicationDetails")
	public ResponseEntity<?> getAllMedicationDetails() {
		List<Medication> medications = medicationService.getMedicationDetails();
		if (medications.size() != 0) {
			return new ResponseEntity<>(medications, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@GetMapping("/medicationId/{medicationId}")
	public ResponseEntity<?> getMedicationDetailsById(@PathVariable int medicationId) {
		Medication medication = medicationService.getMedicationDetailsById(medicationId);
		if (medication != null) {
			return new ResponseEntity<>(medication, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
