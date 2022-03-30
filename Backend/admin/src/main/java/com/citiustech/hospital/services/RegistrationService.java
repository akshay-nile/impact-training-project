package com.citiustech.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.repositories.EmployeeRepository;

@Service
public class RegistrationService {

	@Autowired
	private EmployeeRepository employeeRepo;

	public Employee register(Employee employee) {
		return employeeRepo.save(employee);
	}
}
