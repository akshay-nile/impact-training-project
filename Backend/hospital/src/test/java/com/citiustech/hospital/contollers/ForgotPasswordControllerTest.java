package com.citiustech.hospital.contollers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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

import com.citiustech.hospital.models.templates.PasswordUpdate;
import com.citiustech.hospital.services.ForgotPasswordService;
import com.citiustech.hospital.services.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class ForgotPasswordControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Mock
	private ForgotPasswordService forgotPasswordService;

	@Mock
	private LoginService loginService;

	@InjectMocks
	private ForgotPasswordController forgotPasswordController;

	private String email;
	private PasswordUpdate passUpdate;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(forgotPasswordController).build();
		email = "tejas.gaikar@gmail.com";
		passUpdate = new PasswordUpdate();
		passUpdate.setEmail(email);
		passUpdate.setOldPassword("Tejas123");
		passUpdate.setOldPassword("Tejas@123");
	}

	@AfterEach
	public void tearDown() {
		passUpdate = null;
	}

	@Test
	@DisplayName("Test Method to send otp")
	public void givenEmailToSendOTP() throws Exception {
		when(forgotPasswordService.sendOtpEmail(any())).thenReturn(true);
		mockMvc.perform(post("/api/forgot-password/send-otp").contentType(MediaType.APPLICATION_JSON).content(email))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
		verify(forgotPasswordService).sendOtpEmail(email);
	}

	@Test
	@DisplayName("Test Method to reset Password")
	public void testMethodToResetPassword() throws Exception {
		when(forgotPasswordService.resetPasswordByOtp(any())).thenReturn("Password Changed Successfully");
		mockMvc.perform(post("/api/forgot-password/reset").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(passUpdate))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
		verify(forgotPasswordService).resetPasswordByOtp(any());
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
