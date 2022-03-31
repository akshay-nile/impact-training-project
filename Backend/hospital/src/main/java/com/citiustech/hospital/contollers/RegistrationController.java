package com.citiustech.hospital.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.services.RegistrationService;

@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class RegistrationController {

	@Autowired
	private RegistrationService registrationService;

	@PostMapping("/register")
	private ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
		Patient registeredPatient = registrationService.register(patient);
		return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
	}

}
