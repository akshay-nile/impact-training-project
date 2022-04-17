package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

import com.citiustech.services.EmailSenderService;

@ExtendWith(MockitoExtension.class)
class EmailSenderServiceTest {

	@Mock
	private JavaMailSender javaMailSender;

	@InjectMocks
	private EmailSenderService emailSenderService;

	private String email;
	private String text;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		text = "OTP to verify your password reset attempt is %s\n\n";
		text += "Note: This OTP is valid for 10 minutes; till %s\n\n";
		text += "Please ignore this email if you don't want to reset your password.\n";
	}

	@AfterEach
	public void tearDown() {
	}

	@Test
	@DisplayName("Test Method to send OTP over Email")
	public void testMethodToSendOtpOverEmail() {
		assertTrue(emailSenderService.sendEmail(email, "Verification OTP", text));
	}
}
