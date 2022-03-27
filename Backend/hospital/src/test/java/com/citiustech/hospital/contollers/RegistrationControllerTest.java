package com.citiustech.hospital.contollers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.citiustech.hospital.models.Demographics;
import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.Nominee;
import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.models.constants.Language;
import com.citiustech.hospital.models.templates.Credential;
import com.citiustech.hospital.services.RegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class RegistrationControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Mock
	private RegistrationService registrationService;

	@InjectMocks
	private RegistrationController registrationController;

	private Credential credential, empCredential;
	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();
		credential = new Credential();
		credential.setEmail("tejas.gaikar@gmail.com");
		credential.setPassword("Tejas123");
		empCredential = new Credential();
		empCredential.setEmail("akshay@gmail.com");
		empCredential.setPassword("Akshay123");
		patient = new Patient();
		patient.setFirstName("Tejas");
		patient.setLastName("Gaikar");
		patient.setEmail("tejas.gaikar@gmail.com");
		patient.setPassword(credential.getPassword());
		Nominee nominee = new Nominee();
		nominee.setAccessAllowed(true);
		nominee.setAddress("Mumbai");
		nominee.setEmail("vinay.billa@gmail.com");
		nominee.setFirstName("vinay");
		nominee.setLastName("billa");
		Demographics demographics = new Demographics();
		demographics.setAddress("Mumbai");
		demographics.setAge(25);
		demographics.setGender("Male");
		demographics.setLanguage(Language.ENGLISH_IND);
		patient.setNominee(nominee);
		patient.setDemographics(demographics);
		employee = new Employee();
		employee.setFirstName("akshay");
		employee.setLastName("Nile");
		employee.setEmail(empCredential.getEmail());
		employee.setPassword(empCredential.getPassword());
	}

	@AfterEach
	public void tearDown() {
		credential = null;
		empCredential = null;
		patient = null;
		employee = null;
	}

	@Test
	@DisplayName("Test Method to register new patient")
	public void testMethodToRegisterNewPatient() throws Exception {
		mockMvc.perform(
				post("/api/register/patient").contentType(MediaType.APPLICATION_JSON).content(asJsonString(patient)))
				.andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());

	}

	@Test
	@DisplayName("Test Method to register new Employee")
	public void testMethodToRegisterNewEmployee() throws Exception {
		mockMvc.perform(
				post("/api/register/employee").contentType(MediaType.APPLICATION_JSON).content(asJsonString(employee)))
				.andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print());

	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
