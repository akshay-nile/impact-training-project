package com.citiustech.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.repositories.EmployeeRepository;
import com.citiustech.hospital.repositories.PatientRepository;

@Service
public class UtilityService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public boolean emailExists(String email) {
		email = email.toLowerCase();
		return patientRepo.findByEmail(email) != null || employeeRepo.findByEmail(email) != null;
	}

	public boolean phoneExists(String phone) {
		phone = phone.substring(phone.length() - 10);
		return patientRepo.findByPhone(phone) != null;
	}

}
