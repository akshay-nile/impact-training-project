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

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@ExtendWith(MockitoExtension.class)
class LoginServiceImplTest {

	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private LoginServiceImpl loginService;

	private String email;
	private Map<String, String> credential;
	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
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
	@DisplayName("Test Method to check get patient by Email and Password")
	public void givenPatientEmailAndPasswordThenShouldReturnPatient() {
		when(patientRepo.findByEmailAndPassword(credential.get("email"), credential.get("password").hashCode()))
				.thenReturn(patient);
		loginService.login(credential);
		verify(patientRepo, times(1)).findByEmailAndPassword(credential.get("email"),
				credential.get("password").hashCode());
	}

	@Test
	@DisplayName("Test Method to check get Employee by Email and Password")
	public void givenEmployeeEmailAndPasswordThenShouldReturnEmployeet() {
		when(employeeRepo.findByEmailAndPassword(credential.get("email"), credential.get("password").hashCode()))
				.thenReturn(employee);
		loginService.login(credential);
		verify(employeeRepo, times(1)).findByEmailAndPassword(credential.get("email"),
				credential.get("password").hashCode());
	}

	@Test
	@DisplayName("Test Method to block Patient by email")
	public void givenPatientEmailThenShouldBlockPatient() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		when(patientRepo.save(any())).thenReturn(patient);
		loginService.blockAccountByEmail(email);
		verify(patientRepo, times(1)).findByEmail(email);
		verify(patientRepo, times(1)).save(patient);
	}

	@Test
	@DisplayName("Test Method to block Employee by email")
	public void givenEmployeeEmailThenShouldBlockEmployee() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		when(employeeRepo.save(any())).thenReturn(employee);
		loginService.blockAccountByEmail(email);
		verify(employeeRepo, times(1)).findByEmail(email);
		verify(employeeRepo, times(1)).save(employee);
	}

	@Test
	@DisplayName("Test Method to check if patient email exist")
	public void testMethodToCheckIfPatientEmailExist() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		loginService.isEmailExist(email);
		verify(patientRepo, times(1)).findByEmail(email);
	}

	@Test
	@DisplayName("Test Method to check if Employee email exist")
	public void testMethodToCheckIfEmployeeEmailExist() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		loginService.isEmailExist(email);
		verify(employeeRepo, times(1)).findByEmail(email);
	}
}
