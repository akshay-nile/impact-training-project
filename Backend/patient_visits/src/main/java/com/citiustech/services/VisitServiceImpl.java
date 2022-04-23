package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

	@Autowired
	private DiagnosisService diagnosisService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private MedicationService medicationService;

	@Autowired
	private PatientService patientService;

	@Autowired
	private ProcedureService procedureService;

	@Autowired
	private VitalService vitalService;

	@Override
	public VisitReport getVisitReport(Appointment apt) {

		String patientUrl = "http://localhost:8082/hospital/patientByEmail/" + apt.getPatientEmail();
		String employeeUrl = "http://localhost:8082/hospital/employeeByEmail/" + apt.getEmployeeEmail();
		String vitalUrl = "http://localhost:8085/patient-visits/vitals/aptId/" + apt.getAppointmentId();
		String diagnosisUrl = "http://localhost:8086/diagnosis/api/diagnosisByAptId/" + apt.getAppointmentId();
		String medicationUrl = "http://localhost:8087/medication/api/medicationByAptId/" + apt.getAppointmentId();
		String procedureUrl = "http://localhost:8089/procedure/api/procedureByAptId/" + apt.getAppointmentId();
		Patient patient = patientService.getPatientDetails(patientUrl);
		Employee employee = employeeService.getEmployeeDetails(employeeUrl);
		Vital vital = vitalService.getVitalDetails(vitalUrl);
		List<Diagnosis> diagnosisList = diagnosisService.diagnosisDetails(diagnosisUrl);
		List<Procedure> procedureList = procedureService.procedureDetails(procedureUrl);
		List<Medication> medicationList = medicationService.medicationDetails(medicationUrl);
		return createVisitReport(patient, employee, vital, diagnosisList, medicationList, procedureList, apt);
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
