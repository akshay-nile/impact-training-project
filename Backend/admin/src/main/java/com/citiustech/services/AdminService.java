package com.citiustech.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.citiustech.models.Employee;

@Service
public class AdminService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private EmailSenderService emailSender;

	public List<Employee> getAllEmployees(String adminId) {
		String url = "http://localhost:8080/hospital/get-all-employees";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		List<Employee> employees = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
				new ParameterizedTypeReference<List<Employee>>() {
				}).getBody();

		return employees.stream().filter(e -> !e.getEmployeeId().equals(adminId)).collect(Collectors.toList());
	}

	public Employee update(Employee employee, String action) {
		String url = "http://localhost:8080/hospital/update-employee";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		if (action.equalsIgnoreCase("password")) {
			employee.setPassword("Password@123".hashCode());
		}

		Employee updatedEmployee = restTemplate.exchange(url, HttpMethod.PUT, new HttpEntity<>(employee, headers),
				new ParameterizedTypeReference<Employee>() {
				}).getBody();

		if (updatedEmployee != null) {
			if (action.equalsIgnoreCase("password")) {
				String text = "Hi " + employee.getFirstName() + "!";
				text += "\nYour login password has been successfully reset by the Admin of CT General Hospital.";
				text += "\n\nNow your login password is Password@123";
				text += "\n\nPlease change this password immediately as soon as you login for the next time.";
				emailSender.sendEmail(updatedEmployee.getEmail(), "Login Password Reset", text);
			} else if(action.equalsIgnoreCase("status")) {
				String text = "Hi " + employee.getFirstName() + "!";
				text += "\nYour account status has been set to " + updatedEmployee.getStatus();
				emailSender.sendEmail(updatedEmployee.getEmail(), "Account Status Changed", text);
			}
		}
		return updatedEmployee;
	}

	public Employee register(Employee employee) {
		String url = "http://localhost:8080/hospital/register-employee";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		employee.setPassword("Password@123".hashCode());
		Employee registeredEmployee = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(employee, headers),
				new ParameterizedTypeReference<Employee>() {
				}).getBody();

		if (registeredEmployee != null) {
			String text = "Congratulations! " + employee.getFirstName();
			text += "\nYou've been successfully registered as " + employee.getRole() + " in CT General Hospital.";
			text += "\n\nYour login password is Password@123";
			text += "\n\nPlease change this password immediately as soon as you login for the first time.";
			emailSender.sendEmail(registeredEmployee.getEmail(), "Registration Successfull", text);
		}
		return registeredEmployee;
	}

}
