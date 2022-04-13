package com.citiustech.hospital.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

	public List<Map<String, Object>> getAllEmployeeNames() {
		return employeeRepo.getAllEmployeeName().stream().map(p -> {
			Map<String, Object> map = new HashMap<>();
			map.put("employeeId", String.format("E%04d", p.getEmployeeId()));
			map.put("email", p.getEmail());
			map.put("name", p.getTitle() + ". " + p.getFirstName() + " " + p.getLastName());
			return map;
		}).collect(Collectors.toList());
	}

	public List<Map<String, Object>> getPatientNames() {
		return patientRepo.getPatientNames().stream().map(p -> {
			Map<String, Object> map = new HashMap<>();
			map.put("patientId", String.format("P%04d", p.getPatientId()));
			map.put("email", p.getEmail());
			map.put("name", p.getTitle() + ". " + p.getFirstName() + " " + p.getLastName());
			return map;
		}).collect(Collectors.toList());
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
