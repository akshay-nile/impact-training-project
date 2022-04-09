package com.citiustech.hospital.contollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.services.ChangePasswordService;

@CrossOrigin
@RestController
@RequestMapping("/hospital/api/change-password")
public class ChangePasswordController {

	@Autowired
	private ChangePasswordService changePasswordService;

	@PostMapping("/employee")
	public ResponseEntity<?> changeEmployeePassword(@RequestBody Map<String, String> credentials) {
		boolean isPasswordChanged = changePasswordService.changeEmployeePassword(credentials);
		return new ResponseEntity<>(isPasswordChanged, HttpStatus.OK);
	}

	@GetMapping("/employee/{userId}/{password}")
	public ResponseEntity<?> checkEmployeePassword(@PathVariable int userId, @PathVariable String password) {
		boolean isPasswordValid = changePasswordService.checkEmployeePassword(userId, password);
		return new ResponseEntity<>(isPasswordValid, HttpStatus.OK);
	}
}
