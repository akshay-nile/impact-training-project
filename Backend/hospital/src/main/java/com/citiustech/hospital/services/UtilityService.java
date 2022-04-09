package com.citiustech.hospital.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Patient;
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
	
	
	public List<String> getAllEmployeeNames(){
		return employeeRepo.getAllEmployeeName();
	}

	public List<String> getPatientEmails() {
		return patientRepo.getPatientEmails();
	}

	public int getPatientIdByEmail(String email) {
		return patientRepo.getPatientIdByEmail(email);
	}

	public Patient getPatientById(int id) {
		// TODO Auto-generated method stub
		return patientRepo.getPatientById(id);
	}

	public int getEmployeeId(String email) {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeId(email);
	}

	public Patient updatePatient(Patient patient) {
		// TODO Auto-generated method stub
		return patientRepo.save(patient);
	}


}
