package com.citiustech.services;

import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.models.Verification;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;
import com.citiustech.repositories.VerificationRepository;

@Service
public class ForgotPasswordService {

	@Autowired
	private EmailSenderService emailSenderService;

	@Autowired
	private VerificationRepository verifyRepo;

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public boolean sendOtpEmail(String toEmail) {
		if (patientRepo.findByEmail(toEmail) == null && employeeRepo.findByEmail(toEmail) == null) {
			return false;
		}

		String otp = new DecimalFormat("000000").format(new Random().nextInt(999999));
		long expiresAt = System.currentTimeMillis() + 10 * 60 * 1000;
		String expiry = LocalDateTime.ofInstant(Instant.ofEpochMilli(expiresAt), ZoneId.systemDefault())
				.format(DateTimeFormatter.ofPattern("uuuu-MM-dd hh:mm:ss a")).toUpperCase();

		String text = "OTP to verify your password reset attempt is %s\n\n";
		text += "Note: This OTP is valid for 10 minutes; till %s\n\n";
		text += "Please ignore this email if you don't want to reset your password.\n";

		emailSenderService.sendEmail(toEmail, "Verification OTP", String.format(text, otp, expiry));
		Verification verify = new Verification(toEmail, otp, expiresAt);
		verifyRepo.save(verify);
		return true;
	}

	public String resetPasswordByOtp(Map<String, String> passUpdate) {
		for (String key : "email oldPassword newPassword".split(" ")) {
			if (!passUpdate.containsKey(key)) {
				throw new CustomException(key + " not found in the request.", HttpStatus.BAD_REQUEST);
			}
		}

		Verification record = verifyRepo.findById(passUpdate.get("email")).orElse(null);
		if (record == null) {
			return "failed";
		}

		boolean isExpired = LocalDateTime.ofInstant(Instant.ofEpochMilli(record.getExpiresAt()), ZoneId.systemDefault())
				.isBefore(LocalDateTime.now());
		if (isExpired) {
			verifyRepo.delete(record);
		}

		boolean isCorrect = passUpdate.get("oldPassword").equals(record.getOtp());
		if (isCorrect && isExpired) {
			return "expired";
		}

		if (isCorrect && !isExpired) {
			Patient patient = patientRepo.findByEmail(passUpdate.get("email"));
			if (patient != null) {
				patient.setPassword(passUpdate.get("newPassword").hashCode());
				patientRepo.save(patient);
				verifyRepo.delete(record);
				return "success";
			}

			Employee employee = employeeRepo.findByEmail(passUpdate.get("email"));
			if (employee != null) {
				employee.setPassword(passUpdate.get("newPassword").hashCode());
				employeeRepo.save(employee);
				verifyRepo.delete(record);
				return "success";
			}
		}

		return "failed";
	}

}
