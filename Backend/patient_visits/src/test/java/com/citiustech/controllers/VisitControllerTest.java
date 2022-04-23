package com.citiustech.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import com.citiustech.models.Appointment;
import com.citiustech.services.VisitService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class VisitControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Mock
	private VisitService visitService;

	@InjectMocks
	private VisitController visitController;

	private Appointment appointment;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(visitController).build();
		appointment = new Appointment();
	}

	@AfterEach
	public void tearDown() {
		appointment = null;
	}

	@Test
	@DisplayName("Test Method to get Visit Report")
	public void testMethodToGetVisitReport() throws Exception {
		mockMvc.perform(post("/patient-visits/visit/getVisitReport").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(appointment))).andExpect(status().isOk())
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
