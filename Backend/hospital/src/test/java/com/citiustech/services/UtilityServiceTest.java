package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;
import com.citiustech.services.UtilityService;

@ExtendWith(MockitoExtension.class)
class UtilityServiceTest {
	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private UtilityService utilityService;

	private String email;
	private String phone;
	private Map<String, String> credential;

	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		phone = "9876543210";
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");
		patient = new Patient();
		employee = new Employee();
	}

	@AfterEach
	public void tearDown() {
		credential = null;
	}

	@Test
	@DisplayName("Test Method to check email exists")
	public void givenPatientEmailThenShouldReturntrue() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		assertTrue(utilityService.emailExists(email));
		verify(patientRepo, times(1)).findByEmail(email);
	}

	@Test
	@DisplayName("Test Method to check Patient's phone exists")
	public void givenPatientPhoneThenShouldReturntrue() {
		when(patientRepo.findByPhone(any())).thenReturn(patient);
		assertTrue(utilityService.phoneExists(phone));
		verify(patientRepo, times(1)).findByPhone(phone);
	}
}
