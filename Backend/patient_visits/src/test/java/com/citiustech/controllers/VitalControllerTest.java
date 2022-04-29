package com.citiustech.controllers;

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

import com.citiustech.models.Vital;
import com.citiustech.services.VitalService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class VitalControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private VitalService vitalService;

	@InjectMocks
	private VitalController vitalController;

	private Vital vital;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(vitalController).build();
		vital = new Vital();
	}

	@AfterEach
	public void tearDown() {
		vital = null;
	}

	@Test
	@DisplayName("Test Method to get vitals Details By vital Id")
	public void testMethodToGetVisitDetailsByVitalId() throws Exception {
		mockMvc.perform(
				MockMvcRequestBuilders.get("/patient-visits/vitals/vitalId/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to get vitals Details By Appointment Id")
	public void testMethodToGetVisitDetailsByAppointmentId() throws Exception {
		mockMvc.perform(
				MockMvcRequestBuilders.get("/patient-visits/vitals/appointment/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to save vitals Details")
	public void testMethodToSaveVitalDetails() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/patient-visits/vitals").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(vital))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to update vitals Details")
	public void testMethodToUpdateVitalDetails() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.put("/patient-visits/vitals").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(vital))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to delete vitals Details")
	public void testMethodToDeleteVitalDetails() throws Exception {
		mockMvc.perform(
				MockMvcRequestBuilders.delete("/patient-visits/vitals/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
