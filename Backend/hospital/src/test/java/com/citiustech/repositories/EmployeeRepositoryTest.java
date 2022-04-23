package com.citiustech.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.citiustech.models.Employee;
import com.citiustech.models.constants.Role;
import com.citiustech.repositories.EmployeeRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class EmployeeRepositoryTest {
	@Autowired
	private EmployeeRepository employeeRepo;
	private String email;
	private Map<String,String> credential;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		credential = new HashMap<>();
		credential.put("email","tejas.gaikar@gmail.com");
		credential.put("password","Tejas123");
		employee = new Employee();
		employee.setEmployeeId("EOOO1");
		employee.setFirstName("Tejas");
		employee.setLastName("Gaikar");
		employee.setEmail(email);
		employee.setRole(Role.DOCTOR);
		employee.setPassword(credential.get("password"));
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
		assertEquals(0, employeeRepo.findAll().size());
	}

	@Test
	@DisplayName("Test Method to get Employee by Email and Password")
	public void givenEmailAndPasswordThenShouldReturnEmployee() {
		employeeRepo.save(employee);
		Employee employeetData = employeeRepo.findByEmailAndPassword(credential.get("email"),
				credential.get("password").hashCode());
		assertEquals(email, employeetData.getEmail());
		assertEquals("Tejas", employeetData.getFirstName());
		employeeRepo.deleteAll();
		assertEquals(0, employeeRepo.findAll().size());
	}
}
