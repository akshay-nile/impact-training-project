package com.citiustech.hospital.contollers;

import java.util.List;

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

import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.models.constants.Language;
import com.citiustech.hospital.models.constants.Relation;
import com.citiustech.hospital.services.UtilityService;

@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class UtilityController {

	@Autowired
	private UtilityService utilityService;

	@GetMapping("/enums/languages")
	public Language[] getLanguages() {
		return Language.values();
	}

	@GetMapping("/enums/relations")
	public Relation[] getRelations() {
		return Relation.values();
	}

	@PostMapping("/exists/email")
	public boolean emailExists(@RequestBody String email) {
		return utilityService.emailExists(email);
	}

	@PostMapping("/exists/phone")
	public boolean phoneExists(@RequestBody String phone) {
		return utilityService.phoneExists(phone);
	}

	@GetMapping("/physician/names")
	public List<?> getAllEmployeeName() {
		return utilityService.getAllEmployeeNames();
	}

	@GetMapping("/patient/names")
	public List<?> getPatientNames() {
		return utilityService.getPatientNames();
	}

	@GetMapping("/patient/email/{email}")
	public int getPatientIdByEmail(@PathVariable String email) {
		return utilityService.getPatientIdByEmail(email);
	}

	@GetMapping("/patient/id/{id}")
	public Patient getPatientById(@PathVariable int id) {
		return utilityService.getPatientById(id);
	}

	@GetMapping("/physicianEmail/{email}")
	public ResponseEntity<?> getEmployeeId(@PathVariable String email) {
		return new ResponseEntity<>(utilityService.getEmployeeId(email), HttpStatus.OK);
	}

	@PutMapping("/patientDetails")
	private ResponseEntity<?> updatePatient(@RequestBody Patient patient) {
		Patient registeredPatient = utilityService.updatePatient(patient);
		return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
	}

}
