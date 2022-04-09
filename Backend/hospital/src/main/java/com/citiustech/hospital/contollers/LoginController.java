package com.citiustech.hospital.contollers;

import java.util.Map;

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
import com.citiustech.hospital.services.LoginService;

@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
		Object object = loginService.login(credentials);
		if (object instanceof Employee) {
			return new ResponseEntity<>((Employee) object, HttpStatus.OK);
		}
		if (object instanceof Patient) {
			return new ResponseEntity<>((Patient) object, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@PostMapping("/block-account")
	public ResponseEntity<?> blockAccountByEmail(@RequestBody String email) {
		loginService.blockAccountByEmail(email);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
