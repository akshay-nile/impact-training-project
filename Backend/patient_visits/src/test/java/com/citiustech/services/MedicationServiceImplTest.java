package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.*;
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
import com.citiustech.models.Medication;
import com.citiustech.utils.RestUtil;

@ExtendWith(MockitoExtension.class)
class MedicationServiceImplTest {
	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private MedicationServiceImpl medicationServiceImpl;

	private String url;
	private List<Medication> medicationList;
	private Medication medication;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8087/medication/api/medicationByAptId/1";
		medicationList = new ArrayList<>();
		medication = new Medication();
		medication.setDescription("Medication 1");
		medicationList.add(medication);
	}

	@AfterEach
	public void tearDown() {
		url = null;
		medication = null;

	}

	@Test
	@DisplayName("Test Method to get medication details")
	public void testMethodToGetMedicationDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(medicationList);
		assertNotNull(medicationServiceImpl.medicationDetails(url).get(0).getDescription());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
