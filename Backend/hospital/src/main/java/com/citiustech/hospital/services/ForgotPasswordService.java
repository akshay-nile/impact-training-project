package com.citiustech.hospital.services;

import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.models.templates.PasswordUpdate;
import com.citiustech.hospital.models.templates.Verification;
import com.citiustech.hospital.repositories.EmployeeRepository;
import com.citiustech.hospital.repositories.PatientRepository;
import com.citiustech.hospital.repositories.VerificationRepository;

@Service
public class ForgotPasswordService {

	@Autowired
	private EmailSenderService emailSenderService;

	@Autowired
	private LoginService loginService;

	@Autowired
	private VerificationRepository verifyRepo;

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public boolean sendOtpEmail(String toEmail) {
		if (!loginService.isEmailExist(toEmail)) {
			return false;
		}

		String otp = new DecimalFormat("000000").format(new Random().nextInt(999999));
		long expiresAt = System.currentTimeMillis() + 10 * 60 * 1000;
		String expiry = LocalDateTime.ofInstant(Instant.ofEpochMilli(expiresAt), ZoneId.systemDefault())
				.format(DateTimeFormatter.ofPattern("uuuu-MM-dd hh:mm:ss a")).toUpperCase();

		String text = "OTP to verify your password reset attempt is %s\n\n";
		text += "Note: This OTP is valid for 10 minutes; till %s\n\n";
		text += "Please ignore this email if you don't want to reset your password.\n";

		if (emailSenderService.sendEmail(toEmail, "Verification OTP", String.format(text, otp, expiry))) {
			Verification verify = new Verification(toEmail, otp, expiresAt);
			verifyRepo.save(verify);
			return true;
		}

		return false;
	}

	public String resetPasswordByOtp(PasswordUpdate passUpdate) {
		Verification record = verifyRepo.findById(passUpdate.getEmail()).orElse(null);
		if (record == null) {
			return "failed";
		}

		boolean isExpired = LocalDateTime.ofInstant(Instant.ofEpochMilli(record.getExpiresAt()), ZoneId.systemDefault())
				.isBefore(LocalDateTime.now());
		if (isExpired) {
			verifyRepo.delete(record);
		}

		boolean isCorrect = passUpdate.getOldPassword().equals(record.getOtp());
		if (isCorrect && isExpired) {
			return "expired";
		}

		if (isCorrect && !isExpired) {
			Patient patient = patientRepo.findByEmail(passUpdate.getEmail());
			if (patient != null) {
				patient.setPassword(passUpdate.getNewPassword().hashCode());
				patientRepo.save(patient);
				return "success";
			}

			Employee employee = employeeRepo.findByEmail(passUpdate.getEmail());
			if (employee != null) {
				employee.setPassword(passUpdate.getNewPassword().hashCode());
				employeeRepo.save(employee);
				return "success";
			}
		}

		return "failed";
	}

}
