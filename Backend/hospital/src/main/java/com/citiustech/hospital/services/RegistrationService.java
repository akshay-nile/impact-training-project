package com.citiustech.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.models.Patient;
import com.citiustech.hospital.repositories.EmployeeRepository;
import com.citiustech.hospital.repositories.PatientRepository;

@Service
public class RegistrationService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public Patient register(Patient patient) {
		return patientRepo.save(patient);
	}

	public Employee register(Employee employee) {
		return employeeRepo.save(employee);
	}
}
