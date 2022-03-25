package com.citiustech.hospital.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.templates.Credential;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class EmployeeRepositoryTest {
	@Autowired
	private EmployeeRepository employeeRepo;
	private String email;
	private Credential credential;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		credential = new Credential();
		credential.setEmail("tejas.gaikar@gmail.com");
		credential.setPassword("Tejas123");
		employee = new Employee();
		employee.setFirstName("Tejas");
		employee.setLastName("Gaikar");
		employee.setEmail(email);
		employee.setPassword(credential.getPassword());
	}

	@AfterEach
	public void tearDown() {
		credential = null;
		employee = null;
	}

	@Test
	@DisplayName("Test Method to get Employee by Email")
	public void givenEmailThenShouldReturnEmployee() {
		employeeRepo.save(employee);
		Employee employeetData = employeeRepo.findByEmail(email);
		assertEquals(email, employeetData.getEmail());
		assertEquals("Tejas", employeetData.getFirstName());
		employeeRepo.deleteAll();
	}

	@Test
	@DisplayName("Test Method to get Employee by Email and Password")
	public void givenEmailAndPasswordThenShouldReturnEmployee() {
		employeeRepo.save(employee);
		Employee employeetData = employeeRepo.findByEmailAndPassword(credential.getEmail(),
				credential.getPassword().hashCode());
		assertEquals(email, employeetData.getEmail());
		assertEquals("Tejas", employeetData.getFirstName());
		employeeRepo.deleteAll();
	}
}
