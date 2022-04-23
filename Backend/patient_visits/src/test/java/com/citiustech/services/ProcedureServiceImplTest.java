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

import com.citiustech.models.Procedure;
import com.citiustech.utils.RestUtil;

@ExtendWith(MockitoExtension.class)
class ProcedureServiceImplTest {

	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private ProcedureServiceImpl procedureServiceImpl;

	private String url;
	private List<Procedure> procedureList;
	private Procedure procedure;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8089/procedure/api/procedureByAptId/1";
		procedureList = new ArrayList<>();
		procedure = new Procedure();
		procedure.setDescription("Procedure 1");
		procedureList.add(procedure);
	}

	@AfterEach
	public void tearDown() {
		url = null;
		procedure = null;

	}

	@Test
	@DisplayName("Test Method to get procedure details")
	public void testMethodToGetProcedureDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(procedureList);
		assertNotNull(procedureServiceImpl.procedureDetails(url).get(0).getDescription());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
