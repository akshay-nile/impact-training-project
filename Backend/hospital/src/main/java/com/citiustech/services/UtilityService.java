package com.citiustech.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

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
			map.put("employeeId", p.getEmployeeId());
			map.put("email", p.getEmail());
			map.put("name", p.getTitle() + ". " + p.getFirstName() + " " + p.getLastName());
			return map;
		}).collect(Collectors.toList());
	}

	public List<Map<String, Object>> getPatientNames() {
		return patientRepo.getPatientNames().stream().map(p -> {
			Map<String, Object> map = new HashMap<>();
			map.put("patientId", p.getPatientId());
			map.put("email", p.getEmail());
			map.put("name", p.getTitle() + ". " + p.getFirstName() + " " + p.getLastName());
			return map;
		}).collect(Collectors.toList());
	}

	public int getPatientIdByEmail(String email) {
		if (patientRepo.findByEmail(email) == null) {
			throw new CustomException("Patient does not exists", HttpStatus.NOT_FOUND);
		}
		return patientRepo.getPatientIdByEmail(email);
	}

	public int getEmployeeId(String email) {
		if (employeeRepo.findByEmail(email) == null) {
			throw new CustomException("Employee does not exists", HttpStatus.NOT_FOUND);
		}
		return employeeRepo.getEmployeeId(email);
	}

	public Patient updatePatient(Patient patient) {
		if (!patientRepo.findById(patient.getPatientId()).isPresent()) {
			throw new CustomException("Patient does not exists", HttpStatus.NOT_FOUND);
		}
		return patientRepo.save(patient);
	}
	
	public Employee updateEmployee(Employee employee) {
		if (!employeeRepo.findById(employee.getEmployeeId()).isPresent()) {
			throw new CustomException("Employee does not exists", HttpStatus.NOT_FOUND);
		}
		return employeeRepo.save(employee);
	}

	public Patient getPatientByEmail(String email) {
		return patientRepo.findByEmail(email);
	}

	public Employee getEmployeeByEmail(String email) {
		return employeeRepo.findByEmail(email);
	}

	public Map<String, String> mapEmailsToIds(Map<String, String> map) {
		map.put("patientId", patientRepo.findById(map.get("patientId")).get().getEmail());
		map.put("employeeId", employeeRepo.findById(map.get("employeeId")).get().getEmail());
		return map;
	}

	public List<Employee> getAllEmployees() {
		return employeeRepo.findAll();
	}

	public List<Patient> getAllPatients() {
		return patientRepo.findAll();
	}

	public Patient getPatientById(String patientId) {
		return patientRepo.findById(patientId).orElse(null);
	}
}
