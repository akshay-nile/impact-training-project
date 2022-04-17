package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class RegistrationService {

	@Autowired
	private PatientRepository patientRepo;

	public Patient register(Patient patient) {
		return patientRepo.save(patient);
	}
}
