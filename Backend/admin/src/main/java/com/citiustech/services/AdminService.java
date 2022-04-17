package com.citiustech.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.repositories.EmployeeRepository;
import com.citiustech.repositories.PatientRepository;

@Service
public class AdminService {

	@Autowired
	private EmployeeRepository employeeRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private EmailSenderService emailSender;

	public Employee register(Employee employee) {
		Employee savedEmployee = employeeRepo.save(employee);
		if(savedEmployee != null) {
			String text = "Congratulations! " + employee.getFirstName();
			text += "\nYou've been successfully registered as " + employee.getRole() + " in CT General Hospital.";
			text += "\n\nYour login password is Password@123";
			text += "\n\nPlease change this password immediately as soon as you login for the first time.";
			if(!emailSender.sendEmail(employee.getEmail(), "Registration Successfull", text)) {
				employeeRepo.delete(savedEmployee); 
				return null;
			}
		}
		return savedEmployee;
	}

	public List<Employee> getAllEmployees(Integer adminId) {
		return employeeRepo.findAll().stream()
				.filter(e -> e.getEmployeeId() != adminId)
				.collect(Collectors.toList());
	}

	public List<Patient> getAllPatients() {
		return patientRepo.findAll();
	}

	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
}
