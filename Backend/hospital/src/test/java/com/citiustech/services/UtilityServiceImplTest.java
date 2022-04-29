package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.citiustech.models.constants.Title;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@ExtendWith(MockitoExtension.class)
class UtilityServiceImplTest {
	@Mock
	private PatientRepository patientRepo;

	@Mock
	private EmployeeRepository employeeRepo;

	@InjectMocks
	private UtilityServiceImpl utilityService;

	private String email;
	private String phone;
	private Map<String, String> credential;

	private Patient patient;
	private Patient tempPatient;
	private Employee employee;
	private Employee tempEmployee;
	private List<Employee> empList;
	private List<Patient> patientList;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		phone = "9876543210";
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");
		patient = new Patient();
		patient.setPatientId("P0001");
		patient.setEmail("patient1@gmail.com");
		patient.setTitle(Title.Mr);
		patient.setFirstName("Tony");
		patient.setLastName("Williams");
		tempPatient = new Patient();
		tempPatient.setPatientId("P0002");
		tempPatient.setEmail("patient2@gmail.com");
		tempPatient.setTitle(Title.Mr);
		tempPatient.setFirstName("Corey");
		tempPatient.setLastName("Thompson");
		patientList = new ArrayList<>();
		patientList.add(patient);
		patientList.add(tempPatient);
		employee = new Employee();
		employee.setEmployeeId("EOOO1");
		employee.setEmail("employee1@gmail.com");
		employee.setTitle(Title.Mr);
		employee.setFirstName("Patty");
		employee.setLastName("Helsinki");
		tempEmployee = new Employee();
		employee.setEmployeeId("EOOO2");
		employee.setEmail("employee2@gmail.com");
		employee.setTitle(Title.Mr);
		employee.setFirstName("James");
		employee.setLastName("wikinson");
		empList = new ArrayList<>();
		empList.add(employee);
		empList.add(tempEmployee);
	}

	@AfterEach
	public void tearDown() {
		credential = null;
		employee = null;
		tempEmployee = null;
		empList = null;
		patient = null;
		tempPatient = null;
		patientList = null;
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

	@Test
	@DisplayName("Test Method to get get All Employee Names")
	public void testMetodToGetAllEmployeeNames() {
		when(employeeRepo.getAllEmployeeName()).thenReturn(empList);
		assertNotNull(utilityService.getAllEmployeeNames());
		verify(employeeRepo, times(1)).getAllEmployeeName();
	}

	@Test
	@DisplayName("Test Method to get get All Patient Names")
	public void testMetodToGetAllPatientNames() {
		when(patientRepo.getPatientNames()).thenReturn(patientList);
		assertNotNull(utilityService.getPatientNames());
		verify(patientRepo, times(1)).getPatientNames();
	}

	@Test
	@DisplayName("Test Method to update Patient")
	public void givenPatientThenShouldUpdatePatient() {
		when(patientRepo.save(any())).thenReturn(patient);
		when(patientRepo.findById(any())).thenReturn(Optional.of(patient));
		assertNotNull(utilityService.updatePatient(patient));
		verify(patientRepo, times(1)).save(patient);
	}

	@Test
	@DisplayName("Test Method to get patientId by Email")
	public void givenPatientEmailThenShouldReturnPatientId() {
		when(patientRepo.findByEmail(any())).thenReturn(patient);
		when(patientRepo.getPatientIdByEmail(any())).thenReturn(1);
		assertNotNull(utilityService.getPatientIdByEmail(email));
		verify(patientRepo, times(1)).getPatientIdByEmail(email);
	}

	@Test
	@DisplayName("Test Method to throw custom exception for Invalid Patient Email")
	public void givenInvalidPatientEmailThenShouldThrowException() {
		when(patientRepo.findByEmail(any())).thenReturn(null);
		Assertions.assertThrows(CustomException.class, () -> {
			utilityService.getPatientIdByEmail(email);
		});

	}

	@Test
	@DisplayName("Test Method to get EmployeeId by Email")
	public void givenEmployeeEmailThenShouldReturnEmployeeId() {
		when(employeeRepo.findByEmail(any())).thenReturn(employee);
		when(employeeRepo.getEmployeeId(any())).thenReturn(1);
		assertNotNull(utilityService.getEmployeeId(email));
		verify(employeeRepo, times(1)).getEmployeeId(email);
	}

	@Test
	@DisplayName("Test Method to throw custom exception for Invalid Employee Email")
	public void givenEmployeeEmailThenShouldThrowException() {
		when(employeeRepo.findByEmail(any())).thenReturn(null);
		Assertions.assertThrows(CustomException.class, () -> {
			utilityService.getEmployeeId(email);
		});

	}

	@Test
	@DisplayName("Test Method to get Patient by Id")
	public void givenPatiendEmailThenShouldReturnPatient() {
		when(patientRepo.findById(any())).thenReturn(Optional.of(patient));
		assertNotNull(utilityService.getPatientById("P0001"));
	}

	@Test
	@DisplayName("Test Method to get Employee by Id")
	public void givenEmployeeEmailThenShouldReturnEmployee() {
		when(employeeRepo.findById(any())).thenReturn(Optional.of(employee));
		assertNotNull(utilityService.getEmployeeById("E0002"));
	}

}
