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
import com.citiustech.models.Employee;
import com.citiustech.utils.RestUtil;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceImplTest {
	@Mock
	private RestUtil restUtil;

	@InjectMocks
	private EmployeeServiceImpl employeeServiceImpl;

	private String url;
	private Employee employee;

	@BeforeEach
	public void setUp() {
		url = "http://localhost:8082/hospital/employeeByEmail/tejas@gmail.com";
		employee = new Employee();
		employee.setFirstName("Tejas");
	}

	@AfterEach
	public void tearDown() {
		url = null;
		employee = null;

	}

	@Test
	@DisplayName("Test Method to get Employee details")
	public void testMethodToGetEmployeeDetails() {
		when(restUtil.performGetRequest(any(), any())).thenReturn(employee);
		assertNotNull(employeeServiceImpl.getEmployeeDetails(url).getFirstName());
		verify(restUtil, times(1)).performGetRequest(any(), any());
	}

}
