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

import com.citiustech.services.ChangePasswordService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class ChangePasswordControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private ChangePasswordService changePasswordService;

	@InjectMocks
	private ChangePasswordController ChangePasswordController;

	private Map<String, String> credential;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(ChangePasswordController).build();

		credential = new HashMap<>();
		credential.put("email", "tejas.gaikar@gmail.com");
		credential.put("oldPassword", "Tejas123");
		credential.put("newPassword", "Tejas1234");

	}

	@AfterEach
	public void tearDown() {
		credential = null;
	}

	@Test
	@DisplayName("Test Method to register new patient")
	public void testMethodToRegisterNewPatient() throws Exception {
		mockMvc.perform(post("/hospital/api/change-password").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(credential))).andExpect(status().isOk())
				.andDo(MockMvcResultHandlers.print());
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
