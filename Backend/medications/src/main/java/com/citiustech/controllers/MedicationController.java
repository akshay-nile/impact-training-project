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
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.AppointmentMedications;
import com.citiustech.models.Medication;
import com.citiustech.services.MedicationService;

@CrossOrigin
@RestController
@RequestMapping("/medications/api")
public class MedicationController {

	@Autowired
	private MedicationService medicationService;

	@GetMapping("/get-medication-details")
	public ResponseEntity<?> getAllMedicationDetails() {
		List<Medication> medications = medicationService.getMedicationDetails();
		return new ResponseEntity<>(medications, HttpStatus.OK);
	}

	@DeleteMapping("/delete-medication/{medicationId}")
	public ResponseEntity<?> deleteMedicationById(@PathVariable int medicationId) {
		medicationService.deleteMedicationById(medicationId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/add-medication")
	public ResponseEntity<?> addNewMedication(@RequestBody Medication medication) {
		Medication newMedication = medicationService.addNewMedication(medication);
		return new ResponseEntity<>(newMedication, HttpStatus.OK);
	}

	// ----------------- for AppointmentMedications ---------------------- //

	@GetMapping("/appointment-medications/{appointmentId}")
	public ResponseEntity<?> getMedicationsByAppointmentId(@PathVariable int appointmentId) {
		List<Medication> medications = medicationService.getMedicationsByApppintmentId(appointmentId);
		return new ResponseEntity<>(medications, HttpStatus.OK);
	}

	@PostMapping("/appointment-medications")
	public ResponseEntity<?> addMedicationsForAppointment(@RequestBody AppointmentMedications appointmentMedications) {
		AppointmentMedications addedAppointmentMedications = medicationService
				.addMedicationsForAppointment(appointmentMedications);
		return new ResponseEntity<>(addedAppointmentMedications, HttpStatus.OK);
	}

}
