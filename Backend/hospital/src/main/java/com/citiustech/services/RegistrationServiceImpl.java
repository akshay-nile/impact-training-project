package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class RegistrationServiceImpl implements RegistrationService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public Patient register(Patient patient) {
		if (patient.getPatientId() != null) {
			if (patientRepo.findById(patient.getPatientId()).isPresent()) {
				throw new CustomException("Patient Id already exists", HttpStatus.CONFLICT);
			}
		}
		if (patientRepo.findByEmail(patient.getEmail()) != null) {
			throw new CustomException("Patient email already exists", HttpStatus.CONFLICT);
		}
		return patientRepo.save(patient);
	}

	public Employee register(Employee employee) {
		if (employee.getEmployeeId() != null) {
			if (employeeRepo.findById(employee.getEmployeeId()).isPresent()) {
				throw new CustomException("Employee Id already exists", HttpStatus.CONFLICT);
			}
		}
		if (employeeRepo.findByEmail(employee.getEmail()) != null) {
			throw new CustomException("Employee email already exists", HttpStatus.CONFLICT);
		}
		return employeeRepo.save(employee);
	}
}
