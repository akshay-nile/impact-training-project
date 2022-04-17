package com.citiustech.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class ChangePasswordService {

	@Autowired
	private EmployeeRepository employeeRepo;

	@Autowired
	private PatientRepository patientRepo;

	public boolean changePassword(Map<String, String> credentials) {
		Employee employee = employeeRepo.findByEmail(credentials.get("email"));
		if (employee != null) {
			if (employee.getPassword() == credentials.get("oldPassword").hashCode()) {
				employee.setPassword(credentials.get("newPassword"));
				employeeRepo.save(employee);
				return true;
			}
			return false;
		}

		Patient patient = patientRepo.findByEmail(credentials.get("email"));
		if (patient != null) {
			if (patient.getPassword() == credentials.get("oldPassword").hashCode()) {
				patient.setPassword(credentials.get("newPassword"));
				patientRepo.save(patient);
				return true;
			}
			return false;
		}
		return false;
	}

}
