package com.citiustech.contollers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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

import com.citiustech.contollers.LoginController;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.services.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class LoginControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private LoginService loginService;

	@InjectMocks
	private LoginController loginController;

	private String email;
	private Map<String, String> credentials;
	private Patient patient;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(loginController).build();
		email = "tejas.gaikar@gmail.com";
		credentials = new HashMap<>();
		credentials.put("email", "tejas.gaikar@gmail.com");
		credentials.put("password", "Tejas123");
		patient = new Patient();
		employee = new Employee();
	}

	@AfterEach
	public void tearDown() {
		credentials = null;
		patient = null;
		employee = null;
	}

	@Test
	@DisplayName("Test Method to check Patient login Credentials")
	public void givenEmailAndPasswordToCheckIfPatientIsValid() throws Exception {
		when(loginService.login(any())).thenReturn(patient);
		mockMvc.perform(
				post("/hospital/login/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(credentials)))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
		verify(loginService).login(any());
	}

	@Test
	@DisplayName("Test Method to check Employee login Credentials")
	public void givenEmailAndPasswordToCheckIfEmployeeIsValid() throws Exception {
		when(loginService.login(any())).thenReturn(employee);
		mockMvc.perform(
				post("/hospital/login/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(credentials)))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
		verify(loginService).login(any());
	}

	@Test
	@DisplayName("Test Method to block User by Email")
	public void givenEmailIdToBlockUser() throws Exception {
		mockMvc.perform(post("/hospital/block-account").contentType(MediaType.APPLICATION_JSON).content(email))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
		verify(loginService).blockAccountByEmail(email);
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
