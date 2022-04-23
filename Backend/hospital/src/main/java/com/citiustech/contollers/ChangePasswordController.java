package com.citiustech.contollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.services.ChangePasswordService;

@CrossOrigin
@RestController
@RequestMapping("/hospital/api")
public class ChangePasswordController {

	@Autowired
	private ChangePasswordService changePasswordService;

	@PostMapping("/change-password")
	public ResponseEntity<?> changeEmployeePassword(@RequestBody Map<String, String> credentials) {
		boolean isPasswordChanged = changePasswordService.changePassword(credentials);
		return new ResponseEntity<>(isPasswordChanged, HttpStatus.OK);
	}

}
