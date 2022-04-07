package com.citiustech.hospital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.hospital.models.Employee;
import com.citiustech.hospital.repositories.EmployeeRepository;

@Service
public class RegistrationService {

	@Autowired
	private EmployeeRepository employeeRepo;
	
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
	
}
