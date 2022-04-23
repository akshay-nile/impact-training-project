package com.citiustech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.AppointmentMedication;
import com.citiustech.models.Medication;
import com.citiustech.services.MedicationService;

@CrossOrigin
@RestController
@RequestMapping("/medication/api")
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
	
	@GetMapping("/medicationByAptId/{aptId}")
	public ResponseEntity<?> getMedicationByAptId(@PathVariable int aptId) {
		List<Medication> medicationList = medicationService.getMedicationByAptId(aptId);
		if (medicationList.size() != 0) {
			return new ResponseEntity<>(medicationList, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@PostMapping("/addMedicationByAptId")
	public ResponseEntity<?> addMedicationByApiId(@RequestBody AppointmentMedication appointmentMedication){
		return new ResponseEntity<>(medicationService.getMedicationByAptId(appointmentMedication), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/deleteMedicationById/{id}")
    public ResponseEntity<?> deleteMedicationById(@PathVariable int id) {
		medicationService.deleteMedicationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
	@PostMapping("/addNewMedication")
	public ResponseEntity<?> addNewMedication(@RequestBody Medication medication){
		Medication newMedication = medicationService.addNewMedication(medication);
		return new ResponseEntity<>(newMedication, HttpStatus.OK);
	}
}
