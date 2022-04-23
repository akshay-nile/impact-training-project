package com.citiustech.utils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.citiustech.models.Patient;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;

@ExtendWith(MockitoExtension.class)
class RestUtilTest {
	@Mock
	private RestTemplate restTemplate;

	@InjectMocks
	private RestUtil restUtil;

	private String url;
	private Patient patient ;
	private TestDataUtil testDataUtil;

	@BeforeEach
	public void setUp() throws StreamReadException, DatabindException, IOException {
		url = "http://localhost:8082/hospital/patientByEmail/tejas@gmail.com";
		testDataUtil=new TestDataUtil();
		patient=testDataUtil.getPatient();
	}

	@AfterEach
	public void tearDown() {
		url = null;
		patient = null;

	}

	@Test
	@DisplayName("Test Method to get Patient details")
	public void testMethodToGetPatientDetails() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		when(restTemplate.exchange(url, HttpMethod.GET, entity, Patient.class))
				.thenReturn(new ResponseEntity<Patient>(patient, HttpStatus.OK));
		assertNotNull(restUtil.performGetRequest(url, Patient.class).getFirstName());
		verify(restTemplate, times(1)).exchange(url, HttpMethod.GET, entity, Patient.class);
	}

}
