package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Diagnosis;
import com.citiustech.utils.RestUtil;
import com.citiustech.utils.TestDataUtil;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;

@ExtendWith(MockitoExtension.class)
class DiagnosisServiceImplTest {
	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private DiagnosisServiceImpl diagnosisServiceImpl;

	private String url;
	private List<Diagnosis> diagnosisList;
	private Diagnosis diagnosis;
	private TestDataUtil testDataUtil;

	@BeforeEach
	public void setUp() throws StreamReadException, DatabindException, IOException {
		url = "http://localhost:8086/diagnosis/api/diagnosisByAptId/1";
		diagnosisList = new ArrayList<>();
		testDataUtil=new TestDataUtil();
		diagnosis = testDataUtil.getDiagnosis();
		diagnosisList.add(diagnosis);
	}

	@AfterEach
	public void tearDown() {
		url = null;
		diagnosis = null;

	}

	@Test
	@DisplayName("Test Method to get diagnosis details")
	public void testMethodToGetDiagnosisDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(diagnosisList);
		Diagnosis diagnosis=diagnosisServiceImpl.diagnosisDetails(url).get(0);
		assertNotNull(diagnosis.getDiagnosisId());
		assertNotNull(diagnosis.getTitle());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
