package com.citiustech.hospital.repositories;

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

import com.citiustech.hospital.models.Patient;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class PatientRepositoryTest {

	@Autowired
	private PatientRepository patientRepo;
	private String email;
	private Map<String, String> credential;
	private Patient patient;

	@BeforeEach
	public void setUp() {
		email = "tejas.gaikar@gmail.com";
		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");
		patient = new Patient();
		patient.setFirstName("Tejas");
		patient.setLastName("Gaikar");
		patient.setEmail(email);
		patient.setPassword(credential.get("password").hashCode());
	}

	@AfterEach
	public void tearDown() {
		credential = null;
		patient = null;
	}

	@Test
	@DisplayName("Test Method to get Patient by Email")
	public void givenEmailThenShouldReturnPatient() {
		patientRepo.save(patient);
		Patient patientData = patientRepo.findByEmail(email);
		assertEquals(email, patientData.getEmail());
		assertEquals("Tejas", patientData.getFirstName());
		patientRepo.deleteAll();
	}

	@Test
	@DisplayName("Test Method to get Patient by Email and Password")
	public void givenEmailAndPasswordThenShouldReturnPatient() {
		patientRepo.save(patient);
		Patient patientData = patientRepo.findByEmailAndPassword(credential.get("email"),
				credential.get("password").hashCode());
		assertEquals(email, patientData.getEmail());
		assertEquals("Tejas", patientData.getFirstName());
		patientRepo.deleteAll();
	}
}
