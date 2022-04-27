package com.citiustech.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.citiustech.exceptions.CustomException;
import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class ChangePasswordServiceImpl implements ChangePasswordService{

	@Autowired
	private EmployeeRepository employeeRepo;

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private EmailSenderService emailSenderService;

	public boolean changePassword(Map<String, String> credentials) {
		for (String key : "email oldPassword newPassword".split(" ")) {
			if (!credentials.containsKey(key)) {
				throw new CustomException(key + " not found in the request.", HttpStatus.BAD_REQUEST);
			}
		}

		Employee employee = employeeRepo.findByEmail(credentials.get("email"));
		if (employee != null) {
			if (employee.getPassword() == credentials.get("oldPassword").hashCode()) {
				employee.setPassword(credentials.get("newPassword"));
				employeeRepo.save(employee);
				emailSenderService.sendEmail(employee.getEmail(), "Password Update",
						"Your Password has been successfully changed");
				return true;
			}
			return false;
		}

		Patient patient = patientRepo.findByEmail(credentials.get("email"));
		if (patient != null) {
			if (patient.getPassword() == credentials.get("oldPassword").hashCode()) {
				patient.setPassword(credentials.get("newPassword"));
				patientRepo.save(patient);
				emailSenderService.sendEmail(patient.getEmail(), "Password Update",
						"Your Password has been successfully changed");
				return true;
			}
			return false;
		}
		return false;
	}

}
