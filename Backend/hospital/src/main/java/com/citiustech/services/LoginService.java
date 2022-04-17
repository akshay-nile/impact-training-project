package com.citiustech.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.models.constants.Role;
import com.citiustech.models.constants.Status;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class LoginService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmployeeRepository employeeRepo;

	public boolean isEmailExist(String email) {
		if (employeeRepo.findByEmail(email) != null) {
			return true;
		}
		if (patientRepo.findByEmail(email) != null) {
			return true;
		}
		return false;
	}

	public Object login(Map<String, String> credentials) {
		String email = credentials.get("email");
		int password = credentials.get("password").hashCode();
		Object object;

		if ((object = patientRepo.findByEmailAndPassword(email, password)) != null) {
			return object;
		}
		if ((object = employeeRepo.findByEmailAndPassword(email, password)) != null) {
			return object;
		}

		return null;
	}

	public void blockAccountByEmail(String email) {
		Patient patient = patientRepo.findByEmail(email);
		if (patient != null) {
			patient.setStatus(Status.BLOCKED);
			patientRepo.save(patient);
			return;
		}

		Employee employee = employeeRepo.findByEmail(email);
		if (employee != null && employee.getRole() != Role.ADMIN) {
			employee.setStatus(Status.BLOCKED);
			employeeRepo.save(employee);
		}
	}
}
