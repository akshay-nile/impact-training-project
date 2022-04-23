package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Employee;
import com.citiustech.utils.RestUtil;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private RestUtil restUtil;

	public Employee getEmployeeDetails(String url) {
		return restUtil.performGetRequest(url, Employee.class);
	}

}
