package com.citiustech.contollers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
import com.citiustech.models.constants.Language;
import com.citiustech.models.constants.Relation;
import com.citiustech.services.UtilityService;

@CrossOrigin
@RestController
@RequestMapping("/hospital")
public class UtilityController {

	@Autowired
	private UtilityService utilityService;

	@GetMapping("/enums/languages")
	public Language[] getLanguages() {
		return Language.values();
	}

	@GetMapping("/enums/relations")
	public Relation[] getRelations() {
		return Relation.values();
	}

	@PostMapping("/exists/email")
	public boolean emailExists(@RequestBody String email) {
		return utilityService.emailExists(email);
	}

	@PostMapping("/exists/phone")
	public boolean phoneExists(@RequestBody String phone) {
		return utilityService.phoneExists(phone);
	}

	@GetMapping("/physician/names")
	public List<?> getAllEmployeeName() {
		return utilityService.getAllEmployeeNames();
	}

	@GetMapping("/patient/names")
	public List<?> getPatientNames() {
		return utilityService.getPatientNames();
	}

	@GetMapping("/patient/email/{email}")
	public int getPatientIdByEmail(@PathVariable String email) {
		return utilityService.getPatientIdByEmail(email);
	}

	@GetMapping("/physicianEmail/{email}")
	public ResponseEntity<?> getEmployeeId(@PathVariable String email) {
		return new ResponseEntity<>(utilityService.getEmployeeId(email), HttpStatus.OK);
	}

	@PutMapping("/patientDetails")
	private ResponseEntity<?> updatePatient_Old(@RequestBody Patient patient) {
		Patient registeredPatient = utilityService.updatePatient(patient);
		return new ResponseEntity<>(registeredPatient, HttpStatus.OK);
	}

	@GetMapping("/get-patient/{patientId}")
	public Patient getPatientById(@PathVariable String patientId) {
		return utilityService.getPatientById(patientId);
	}

	@GetMapping("/get-employee/{employeeId}")
	public Employee getEmployeeById(@PathVariable String employeeId) {
		return utilityService.getEmployeeById(employeeId);
	}

	@PostMapping("/get-emails-from-ids")
	public ResponseEntity<?> mapEmailsToIds(@RequestBody Map<String, String> map) {
		Map<String, String> info = utilityService.mapEmailsToIds(map);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

	// -------------------- Employee Management ---------------------- //

	@GetMapping("/get-employees")
	public ResponseEntity<?> getAllEmployees() {
		List<Employee> employees = utilityService.getAllEmployees();
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	@PutMapping("/update-employee")
	public ResponseEntity<?> updateEmployee(@RequestBody Employee employee) {
		Employee updatedEmployees = utilityService.updateEmployee(employee);
		return new ResponseEntity<>(updatedEmployees, HttpStatus.OK);
	}

	// -------------------- Patient Management ---------------------- //

	@GetMapping("/get-patients")
	public ResponseEntity<?> getAllPatients() {
		List<Patient> patients = utilityService.getAllPatients();
		return new ResponseEntity<>(patients, HttpStatus.OK);
	}

	@PutMapping("/update-patient")
	public ResponseEntity<?> updatePatient(@RequestBody Patient patient) {
		Patient updatedPatient = utilityService.updatePatient(patient);
		return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
	}

}
