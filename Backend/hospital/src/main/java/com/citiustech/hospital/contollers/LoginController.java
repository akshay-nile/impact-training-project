package com.citiustech.hospital.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.models.templates.Credential;
import com.citiustech.hospital.services.LoginService;

@CrossOrigin
@RestController
@RequestMapping("/api/login")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/")
	public ResponseEntity<?> login(@RequestBody Credential credential) {
		Object object = loginService.login(credential);
		if (object instanceof Employee) {
			return new ResponseEntity<>((Employee) object, HttpStatus.OK);
		}
		if (object instanceof Patient) {
			return new ResponseEntity<>((Patient) object, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@PostMapping("/block")
	public ResponseEntity<?> blockAccountByEmail(@RequestBody String email) {
		loginService.blockAccountByEmail(email);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
