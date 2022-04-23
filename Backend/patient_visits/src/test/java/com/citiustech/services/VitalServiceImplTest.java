package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Patient;
import com.citiustech.models.Vital;
import com.citiustech.repositories.VitalRepository;
import com.citiustech.utils.RestUtil;

@ExtendWith(MockitoExtension.class)
class VitalServiceImplTest {
	@Mock
	private RestUtil restUtil;
	@Mock
	private VitalRepository vitalRepo;

	@InjectMocks
	private VitalServiceImpl vitalServiceImpl;

	private String url;
	private Vital vital;
	private List<Vital> vitalList;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8082/hospital/patientByEmail/tejas@gmail.com";
		vitalList = new ArrayList<>();
		vital = new Vital();
		vital.setBloodPressure("110");
		vital.setAptId(1);
		vital.setVitalId(1);
		vitalList.add(vital);
	}

	@AfterEach
	public void tearDown() {
		url = null;
		vital = null;

	}

	@Test
	@DisplayName("Test Method to get vital details By Vital Id")
	public void testMethodToGetVitalDetailsByVitalId() {
		when(vitalRepo.findById(1)).thenReturn(Optional.of(vital));
		assertNotNull(vitalServiceImpl.getVitalDetailsByAptId(1).getBloodPressure());
	}

	@Test
	@DisplayName("Test Method to get all vital details")
	public void testMethodToGetAllVitalDetails() {
		when(vitalRepo.findAll()).thenReturn(vitalList);
		assertNotNull(vitalServiceImpl.getVitalDetails().get(0).getBloodPressure());
	}

	@Test
	@DisplayName("Test Method to get save vital details")
	public void testMethodToSaveVitalDetails() {
		when(vitalRepo.save(any())).thenReturn(vital);
		assertNotNull(vitalServiceImpl.saveVitalDetails(vital).getBloodPressure());
	}
	
	@Test
	@DisplayName("Test Method to get delete vital details")
	public void testMethodTodeleteVitalDetails() {
		when(vitalRepo.findById(1)).thenReturn(Optional.of(vital));
		assertNotNull(vitalServiceImpl.deleteVitalDetails(1).getBloodPressure());
	}

	@Test
	@DisplayName("Test Method to get vital details By Patient Id")
	public void testMethodToGetVitalDetailsByPatientId() {
		when(vitalRepo.getVitalDetailsByPatientId(1)).thenReturn(vital);
		assertNotNull(vitalServiceImpl.getVitalDetailsByPatientId(1).getBloodPressure());
	}

	@Test
	@DisplayName("Test Method to get vital details ")
	public void testMethodToGetVitalDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(vital);
		assertNotNull(vitalServiceImpl.getVitalDetails(url).getBloodPressure());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
