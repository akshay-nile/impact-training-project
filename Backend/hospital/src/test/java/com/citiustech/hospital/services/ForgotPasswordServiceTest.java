package com.citiustech.hospital.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.models.templates.PasswordUpdate;
import com.citiustech.hospital.models.templates.Verification;
import com.citiustech.hospital.repositories.EmployeeRepository;
import com.citiustech.hospital.repositories.PatientRepository;
import com.citiustech.hospital.repositories.VerificationRepository;

@ExtendWith(MockitoExtension.class)
class ForgotPasswordServiceTest {
	@Mock
	private EmailSenderService emailSenderService;

	@Mock
	private LoginService loginService;

	@Mock
	private VerificationRepository verifyRepo;

	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private ForgotPasswordService forgotPasswordService;

	private String email;
	private Patient patient;
	private Employee employee;
	private Verification record;
	private PasswordUpdate passUpdate;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		patient = new Patient();
		employee = new Employee();
		record = new Verification();
		record.setEmail(email);
		record.setOtp("123456");
		record.setExpiresAt(System.currentTimeMillis() + 10 * 60 * 1000);
		passUpdate = new PasswordUpdate();
		passUpdate.setEmail(email);
		passUpdate.setOldPassword("123456");
		passUpdate.setNewPassword("Tejas@123");
	}

	@AfterEach
	public void tearDown() {
		patient = null;
		employee = null;
		record = null;
		passUpdate = null;
	}

	@Test
	@DisplayName("Test Method to send OTP")
	public void givenEmailToSendOTP() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		when(emailSenderService.sendEmail(any(), any(), any())).thenReturn(true);
		assertTrue(forgotPasswordService.sendOtpEmail(email));
		verify(emailSenderService, times(1)).sendEmail(any(), any(), any());
		verify(patientRepo, times(1)).findByEmail(any());
	}

	@Test
	@DisplayName("Test Method to reset password by OTP of Patient")
	public void testMethodToResetPasswordByOTPOfPatient() {
		when(verifyRepo.findById(any())).thenReturn(Optional.of(record));
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		assertEquals("success", forgotPasswordService.resetPasswordByOtp(passUpdate));
		verify(verifyRepo, times(1)).findById(any());
		verify(patientRepo, times(1)).findByEmail(any());
	}

	@Test
	@DisplayName("Test Method to reset password by OTP of Employee")
	public void testMethodToResetPasswordByOTPOfEmployee() {
		when(verifyRepo.findById(any())).thenReturn(Optional.of(record));
		when(patientRepo.findByEmail(any())).thenReturn(null);
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		assertEquals("success", forgotPasswordService.resetPasswordByOtp(passUpdate));
		verify(verifyRepo, times(1)).findById(any());
		verify(employeeRepo, times(1)).findByEmail(any());
	}

}
