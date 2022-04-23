package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.utils.RestUtil;

@ExtendWith(MockitoExtension.class)
class PatientServiceImplTest {
	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private PatientServiceImpl patientServiceImpl;

	private String url;
	private Patient patient;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8082/hospital/patientByEmail/tejas@gmail.com";
		patient = new Patient();
		patient.setFirstName("Tejas");
	}

	@AfterEach
	public void tearDown() {
		url = null;
		patient = null;

	}

	@Test
	@DisplayName("Test Method to get Patient details")
	public void testMethodToGetPatientDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(patient);
		assertNotNull(patientServiceImpl.getPatientDetails(url).getFirstName());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
