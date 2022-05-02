package com.citiustech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.services.AdminService;

@RestController
@RequestMapping("/admin/api")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@GetMapping("/get-employees")
	public ResponseEntity<?> getAllEmployees(@RequestParam(required = false) String adminId) {
		List<Employee> employees = adminService.getAllEmployees(adminId);
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	@PostMapping("/register-employee")
	public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
		Employee registeredEmployee = adminService.register(employee);
		return new ResponseEntity<>(registeredEmployee, HttpStatus.CREATED);
	}

	@PutMapping("/update-employee")
	public ResponseEntity<?> updateEmployee(@RequestBody Employee employee, @RequestParam String action) {
		Employee updatedEmployee = adminService.update(employee, action);
		return new ResponseEntity<>(updatedEmployee, HttpStatus.CREATED);
	}

	// -------------------- Patient Management --------------------- //

	@GetMapping("/get-patients")
	public ResponseEntity<?> getAllPatients() {
		List<Patient> patients = adminService.getAllPatients();
		return new ResponseEntity<>(patients, HttpStatus.OK);
	}

	@PutMapping("/update-patient")
	public ResponseEntity<?> updatePatient(@RequestBody Patient patient) {
		Patient updatedPatient = adminService.update(patient);
		return new ResponseEntity<>(updatedPatient, HttpStatus.CREATED);
	}

}
