package com.citiustech.contollers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.citiustech.models.Demographics;
import com.citiustech.models.Employee;
import com.citiustech.models.Nominee;
import com.citiustech.models.Patient;
import com.citiustech.models.constants.Language;
import com.citiustech.services.RegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class RegistrationControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Mock
	private RegistrationService registrationService;

	@InjectMocks
	private RegistrationController registrationController;

	private Map<String, String> credential, empCredential;
	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();

		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("password", "Tejas123");

		empCredential = new HashMap<>();
		empCredential.put("email", "akshay@gmail.com");
		empCredential.put("password", "Akshay123");

		patient = new Patient();
		patient.setFirstName("Tejas");
		patient.setLastName("Gaikar");
		patient.setEmail("tejas.gaikar@gmail.com");
		patient.setPassword(credential.get("password"));

		Nominee nominee = new Nominee();
		nominee.setIsAccessAllowed(true);
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
		employee.setEmail(empCredential.get("email"));
		employee.setPassword(empCredential.get("password"));
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
				post("/hospital/register").contentType(MediaType.APPLICATION_JSON).content(asJsonString(patient)))
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
