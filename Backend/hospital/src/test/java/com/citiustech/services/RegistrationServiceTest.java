package com.citiustech.services;

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

import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;
import com.citiustech.services.RegistrationService;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {
	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private RegistrationService registrationService;

	private Map<String, String> credential;
	private Patient patient;

	@BeforeEach
	public void setUp() {
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");
		patient = new Patient();
	}

	@AfterEach
	public void tearDown() {
		credential = null;
	}

	@Test
	@DisplayName("Test Method to add new Patient ")
	public void givenPatientDetailsThenShouldReturnPatient() {
		when(patientRepo.save(any())).thenReturn(patient);
		registrationService.register(patient);
		verify(patientRepo, times(1)).save(patient);
	}

}
