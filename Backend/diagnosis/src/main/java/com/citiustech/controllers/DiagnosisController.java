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

import com.citiustech.models.AppointmentDiagnosis;
import com.citiustech.models.Diagnosis;
import com.citiustech.services.DiagnosisService;

@CrossOrigin
@RestController
@RequestMapping("/diagnosis/api")
public class DiagnosisController {

	@Autowired
	private DiagnosisService diagnosisService;
	
	@GetMapping("/get-diagnosis-details")
	public ResponseEntity<?> getAllDiagnosisDetails() {
		List<Diagnosis> diagnosis = diagnosisService.getDiagnosisDetails();
		return new ResponseEntity<>(diagnosis, HttpStatus.OK);
	}

	@DeleteMapping(value = "/delete-diagnosis/{diagnosisId}")
    public ResponseEntity<?> deleteDiagnosisById(@PathVariable int diagnosisId) {
		diagnosisService.deleteDiagnosisById(diagnosisId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
	@PostMapping("/add-diagnosis")
	public ResponseEntity<?> addNewDiagnosis(@RequestBody Diagnosis diagnosis){
		Diagnosis newDiagnosis = diagnosisService.addNewDiagnosis(diagnosis);
		return new ResponseEntity<>(newDiagnosis, HttpStatus.OK);
	}
	
	
	// ----------------- for AppointmentDiagnosis ---------------------- //
	
	@GetMapping("/appointment-diagnosis/{appointmentId}")
	public ResponseEntity<?> getDiagnosisByAppointmentId(@PathVariable int appointmentId) {
		List<Diagnosis> diagnosis = diagnosisService.getDiagnosisByApppintmentId(appointmentId);
		return new ResponseEntity<>(diagnosis, HttpStatus.OK);
	}
	
	@PostMapping("/appointment-diagnosis")
	public ResponseEntity<?> addDiagnosisForAppointment(@RequestBody AppointmentDiagnosis appointmentDiagnosis){
		AppointmentDiagnosis addedAppointmentDiagnosis = diagnosisService.addDiagnosisForAppointment(appointmentDiagnosis);
		return new ResponseEntity<>(addedAppointmentDiagnosis, HttpStatus.OK);
	}
	
}
