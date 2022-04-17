package com.citiustech.services;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.citiustech.models.Appointment;
import com.citiustech.models.Diagnosis;
import com.citiustech.models.Employee;
import com.citiustech.models.Medication;
import com.citiustech.models.Patient;
import com.citiustech.models.Procedure;
import com.citiustech.models.VisitReport;
import com.citiustech.models.Vital;

@Service
public class VisitServiceImpl implements VisitService {

	private RestTemplate restTemplate = new RestTemplate();

	@Override
	public VisitReport getVisitReport(Appointment apt) {

		Patient patient = getPatientDetails("http://localhost:8082/hospital/patientByEmail/" + apt.getPatientEmail());
		Employee employee = getEmployeeDetails("http://localhost:8082/hospital/employeeByEmail/" + apt.getPhysician());
		Vital vital = getVitalDetails("http://localhost:8085/patient-visits/vitals/aptId/" + apt.getAptId());
		List<Diagnosis> diagnosisList = diagnosisDetails(
				"http://localhost:8086/diagnosis/api/diagnosisByAptId/" + apt.getAptId());
		List<Medication> medicationList = medicationDetails(
				"http://localhost:8087/medication/api/medicationByAptId/" + apt.getAptId());
		List<Procedure> procedureList = procedureDetails(
				"http://localhost:8089/procedure/api/procedureByAptId/" + apt.getAptId());
		return createVisitReport(patient, employee, vital, diagnosisList, medicationList, procedureList, apt);
	}

	private Employee getEmployeeDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<Employee> employee = restTemplate.exchange(url, HttpMethod.GET, entity, Employee.class);
		return employee.getBody();
	}

	private Patient getPatientDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<Patient> patient = restTemplate.exchange(url, HttpMethod.GET, entity, Patient.class);
		return patient.getBody();
	}

	private Vital getVitalDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<Vital> vital = restTemplate.exchange(url, HttpMethod.GET, entity, Vital.class);
		return vital.getBody();
	}

	private List<Diagnosis> diagnosisDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<List<Diagnosis>> diagnosisList = restTemplate.exchange(url, HttpMethod.GET, entity,
				new ParameterizedTypeReference<List<Diagnosis>>() {
				});
		return diagnosisList.getBody();
	}

	private List<Medication> medicationDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<List<Medication>> medicationList = restTemplate.exchange(url, HttpMethod.GET, entity,
				new ParameterizedTypeReference<List<Medication>>() {
				});
		return medicationList.getBody();
	}

	private List<Procedure> procedureDetails(String url) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity entity = new HttpEntity(headers);
		ResponseEntity<List<Procedure>> procedureList = restTemplate.exchange(url, HttpMethod.GET, entity,
				new ParameterizedTypeReference<List<Procedure>>() {
				});
		return procedureList.getBody();
	}

	private VisitReport createVisitReport(Patient patient, Employee employee, Vital vital,
			List<Diagnosis> diagnosisList, List<Medication> medicationList, List<Procedure> procedureList,
			Appointment apt) {
		VisitReport report = new VisitReport();
		report.setPatient(patient);
		report.setPhysician(employee);
		report.setAppointment(apt);
		report.setVitals(vital);
		report.setDiagnosis(diagnosisList);
		report.setMedications(medicationList);
		report.setProcedures(procedureList);
		return report;
	}

}
