package com.citiustech.hospital.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.services.RegistrationService;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {
	
	@Autowired
	private RegistrationService registrationService;

	@GetMapping("/test-message")
	public String getMessage() {
		return "<h1>Admin Microservice is working...!</h1>";
	}
	
	@PostMapping("/employee")
	public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
		Employee registeredEmployee = registrationService.register(employee);
		return new ResponseEntity<>(registeredEmployee, HttpStatus.CREATED);
	}

}
