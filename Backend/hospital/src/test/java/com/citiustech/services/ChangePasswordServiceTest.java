package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertFalse;
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
import com.citiustech.models.constants.Title;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@ExtendWith(MockitoExtension.class)
class ChangePasswordServiceTest {

	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@Mock
	private EmailSenderService emailSenderService;

	@InjectMocks
	private ChangePasswordService changePasswordService;

	private Map<String, String> credential;

	private Patient patient;

	private Employee employee;

	@BeforeEach
	public void setUp() {
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("newPassword", "Tejas1234");
		credential.put("oldPassword", "Tejas123");
		patient = new Patient();
		patient.setPatientId("P0001");
		patient.setEmail("patient1@gmail.com");
		patient.setTitle(Title.Mr);
		patient.setFirstName("Tony");
		patient.setLastName("Williams");
		patient.setPassword("Tejas123".hashCode());
		employee = new Employee();
		employee.setEmployeeId("EOOO1");
		employee.setEmail("employee1@gmail.com");
		employee.setTitle(Title.Mr);
		employee.setFirstName("Patty");
		employee.setLastName("Helsinki");
		employee.setPassword("Tejas123".hashCode());

	}

	@AfterEach
	public void tearDown() {
		credential = null;
		employee = null;
		patient = null;
	}

	@Test
	@DisplayName("Test Method to change employee password")
	public void testMetodToChangeEmployeePassword() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		when(employeeRepo.save(any())).thenReturn(employee);
		assertTrue(changePasswordService.changePassword(credential));
		verify(employeeRepo, times(1)).findByEmail(credential.get("email"));
	}

	@Test
	@DisplayName("Test Method to change employee password returns false")
	public void testMetodToChangeEmployeePasswordThenReturnFalse() {
		when(employeeRepo.findByEmail(any())).thenReturn(null);
		assertFalse(changePasswordService.changePassword(credential));
		verify(employeeRepo, times(1)).findByEmail(credential.get("email"));
	}

	@Test
	@DisplayName("Test Method to change Patient password")
	public void testMetodToChangePatientPassword() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		when(patientRepo.save(any())).thenReturn(patient);
		assertTrue(changePasswordService.changePassword(credential));
		verify(patientRepo, times(1)).findByEmail(credential.get("email"));
	}

	@Test
	@DisplayName("Test Method to change Patient password returns false")
	public void testMetodToChangePatientPasswordThenReturnFalse() {
		when(patientRepo.findByEmail(any())).thenReturn(null);
		assertFalse(changePasswordService.changePassword(credential));
		verify(patientRepo, times(1)).findByEmail(credential.get("email"));
	}

}
