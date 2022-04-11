package com.citiustech.hospital.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.repositories.EmployeeRepository;

@Service
public class ChangePasswordService {

	@Autowired
	private EmployeeRepository employeeRepo;

	public boolean changeEmployeePassword(Map<String, String> credentials) {
		return false;
	}

	public boolean checkEmployeePassword(int userId, String password) {
		Employee emp= employeeRepo.checkEmployeePassword(userId, password.hashCode());
		return emp!=null?true:false;
	}

}
