package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Patient;
import com.citiustech.repositories.PatientRepository;

@Service
public class RegistrationService {

	@Autowired
	private PatientRepository patientRepo;

	public Patient register(Patient patient) {
		System.out.println(patient);
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
}
