package com.citiustech.hospital.services;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
import com.citiustech.hospital.models.templates.Credential;
import com.citiustech.hospital.repositories.EmployeeRepository;
import com.citiustech.hospital.repositories.PatientRepository;

@ExtendWith(MockitoExtension.class)
class LoginServiceTest {

	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private LoginService loginService;

	private String email;
	private Credential credential;
	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {

		email = "tejas.gaikar@gmail.com";
		credential = new Credential();
		credential.setEmail("tejas.gaikar@gmail.com");
		credential.setPassword("Tejas123");
		patient = new Patient();
		employee = new Employee();
	}

	@AfterEach
	public void tearDown() {
		credential = null;
	}

	@Test
	@DisplayName("Test Method to check Patient email")
	public void givenPatientEmailThenShouldReturntrue() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		assertTrue(loginService.isEmailExist(email));
		verify(patientRepo, times(1)).findByEmail(email);
	}

	@Test
	@DisplayName("Test Method to check Employee email")
	public void givenEmployeeEmailThenShouldReturntrue() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		assertTrue(loginService.isEmailExist(email));
		verify(employeeRepo, times(1)).findByEmail(email);
	}

	@Test
	@DisplayName("Test Method to check get patient by Email and Password")
	public void givenPatientEmailAndPasswordThenShouldReturnPatient() {
		when(patientRepo.findByEmailAndPassword(credential.getEmail(), credential.getPassword().hashCode()))
				.thenReturn(patient);
		loginService.login(credential);
		verify(patientRepo, times(1)).findByEmailAndPassword(credential.getEmail(),
				credential.getPassword().hashCode());
	}

	@Test
	@DisplayName("Test Method to check get Employee by Email and Password")
	public void givenEmployeeEmailAndPasswordThenShouldReturnEmployeet() {
		when(employeeRepo.findByEmailAndPassword(credential.getEmail(), credential.getPassword().hashCode()))
				.thenReturn(employee);
		loginService.login(credential);
		verify(employeeRepo, times(1)).findByEmailAndPassword(credential.getEmail(),
				credential.getPassword().hashCode());
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
}
