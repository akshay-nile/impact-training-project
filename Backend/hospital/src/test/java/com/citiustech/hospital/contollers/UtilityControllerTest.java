package com.citiustech.hospital.contollers;

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

import com.citiustech.hospital.services.UtilityService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class UtilityControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@InjectMocks
	private UtilityController utilityController;

	@Mock
	private UtilityService utilityService;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(utilityController).build();
	}

	@AfterEach
	public void tearDown() {

	}

	@Test
	@DisplayName("Test method to get all Languages")
	public void getAllLanguages() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/enums/languages").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to get all Relations")
	public void getAllRelations() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/hospital/enums/relations").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to check if email exists")
	public void checkEmailExists() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/hospital/exists/email").content("noemail@gmail.com"))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test method to check if phone exists")
	public void checkPhoneExists() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/hospital/exists/phone").content("+91 7676767676"))
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
