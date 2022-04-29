package com.citiustech.contollers;

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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.citiustech.models.Patient;
import com.citiustech.services.UtilityService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class UtilityControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@InjectMocks
	private UtilityController utilityController;

	@Mock
	private UtilityService utilityService;

	private Patient patient;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(utilityController).build();

		patient = new Patient();
		patient.setFirstName("Tejas");
		patient.setLastName("Gaikar");
		patient.setEmail("tejas.gaikar@gmail.com");
		patient.setPassword("Tejas123".hashCode());
	}

	@AfterEach
	public void tearDown() {

	}

	@Test
	@DisplayName("Test method to get all Languages")
	public void testMethodToGetAllLanguages() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/enums/languages").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get all Relations")
	public void testMethodToGetAllRelations() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/enums/relations").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to check if email exists")
	public void testMethodToCheckEmailExists() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/hospital/exists/email").content("noemail@gmail.com"))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to check if phone exists")
	public void testMethodToCheckPhoneExists() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/hospital/exists/phone").content("+91 7676767676"))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Employee names")
	public void testMethodToGetAllEmployeeName() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/physician/names").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Patient names")
	public void testMethodToGetPatientNames() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/patient/names").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Patient Id By Email")
	public void testMethodToGetPatientIdByEmail() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/patient/email/patient@gmail.com")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Employee Id By Email")
	public void testMethodToGetEmployeeIdByEmail() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/physicianEmail/Employee@gmail.com")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Patient By Id")
	public void testMethodToGetPatientByEmail() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/get-patient/1")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get Employee By Id")
	public void testMethodToGetEmployeeByEmail() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/get-employee/1")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to Update patient")
	public void testMethodToUpdatePatient() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.put("/hospital/patientDetails").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patient))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
