package com.citiustech.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;

import utils.TestDataUtil;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceImplTest {
	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private RegistrationServiceImpl registrationService;

	private Map<String, String> credential;
	private Patient patient;
	private Employee employee;
	private TestDataUtil testDataUtil;

	@BeforeEach
	public void setUp() throws StreamReadException, DatabindException, IOException {
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");
		testDataUtil = new TestDataUtil();
		patient = testDataUtil.getPatient();
		employee = testDataUtil.getEmployee();
	}

	@AfterEach
	public void tearDown() {
		credential = null;
	}

	@Test
	@DisplayName("Test Method to throw custom Exception for existing patient Id")
	public void testMethodToThrowCustomExceptionForExistingId() {
		when(patientRepo.findById(any())).thenReturn(Optional.of(patient));
		Assertions.assertThrows(CustomException.class, () -> {
			registrationService.register(patient);
		});
		verify(patientRepo, times(1)).findById(any());
	}

	@Test
	@DisplayName("Test Method to throw custom Exception for existing patient Email")
	public void testMethodToThrowCustomExceptionForExistingEmail() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		patient.setPatientId(null);
		Assertions.assertThrows(CustomException.class, () -> {
			registrationService.register(patient);
		});
		verify(patientRepo, times(1)).findByEmail(any());
	}

	@Test
	@DisplayName("Test Method to add new Patient")
	public void testMethodToAddNewPatient() {
		when(patientRepo.save(any())).thenReturn(patient);
		registrationService.register(patient);
		verify(patientRepo, times(1)).save(any());
	}

	@Test
	@DisplayName("Test Method to throw custom Exception for existing Employee Id")
	public void testMethodToThrowCustomExceptionForExistingEmployeeId() {
		when(employeeRepo.findById(any())).thenReturn(Optional.of(employee));
		Assertions.assertThrows(CustomException.class, () -> {
			registrationService.register(employee);
		});
		verify(employeeRepo, times(1)).findById(any());
	}

	@Test
	@DisplayName("Test Method to throw custom Exception for existing Employee Email")
	public void testMethodToThrowCustomExceptionForExistingEmployeeEmail() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		employee.setEmployeeId(null);
		Assertions.assertThrows(CustomException.class, () -> {
			registrationService.register(employee);
		});
		verify(employeeRepo, times(1)).findByEmail(any());
	}

	@Test
	@DisplayName("Test Method to add new Employee")
	public void testMethodToAddNewEmployee() {
		when(employeeRepo.save(any())).thenReturn(employee);
		registrationService.register(employee);
		verify(employeeRepo, times(1)).save(any());
	}

}
