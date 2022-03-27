package com.citiustech.hospital.contollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.hospital.models.templates.PasswordUpdate;
import com.citiustech.hospital.services.ForgotPasswordService;

@CrossOrigin
@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

	@Autowired
	private ForgotPasswordService forgotPasswordService;

	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtpEmail(@RequestBody String email) {
		boolean isOtpSent = forgotPasswordService.sendOtpEmail(email);
		return new ResponseEntity<>(isOtpSent, HttpStatus.OK);
	}

	@PostMapping("/reset")
	public ResponseEntity<?> resetPasswordByOtp(@RequestBody PasswordUpdate passUpdate) {
		String message = forgotPasswordService.resetPasswordByOtp(passUpdate);
		return new ResponseEntity<>("\"" + message + "\"", HttpStatus.OK);
	}
}
