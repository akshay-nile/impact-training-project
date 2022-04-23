package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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

@ExtendWith(MockitoExtension.class)
class DiagnosisServiceImplTest {
	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private DiagnosisServiceImpl diagnosisServiceImpl;

	private String url;
	private List<Diagnosis> diagnosisList;
	private Diagnosis diagnosis;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8086/diagnosis/api/diagnosisByAptId/1";
		diagnosisList = new ArrayList<>();
		diagnosis = new Diagnosis();
		diagnosis.setDiagnosisId(1);
		diagnosis.setTitle("Diagnosis 1");
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
		assertNotNull(diagnosisServiceImpl.diagnosisDetails(url).get(0).getTitle());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
