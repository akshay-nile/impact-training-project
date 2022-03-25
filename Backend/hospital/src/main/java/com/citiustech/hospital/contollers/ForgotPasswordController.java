package com.citiustech.hospital.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.services.EmailSenderService;

@CrossOrigin
@RestController
@RequestMapping("/api/forgotPassword")
public class ForgotPasswordController {
	@Autowired
	private EmailSenderService emailrService;

	@PostMapping("/")
	public ResponseEntity<?> isEmailExist(@RequestBody String email) {
		boolean otpSent = emailrService.sendEmail(email);
		return new ResponseEntity<>(otpSent, HttpStatus.OK);
	}
}
