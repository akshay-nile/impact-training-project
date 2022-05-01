package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public VisitReport getVisitReport(Appointment appointment) {

		String patientUrl = "http://gateway-microservice:8080/hospital/get-patient/" + appointment.getPatientId();
		String employeeUrl = "http://gateway-microservice:8080/hospital/get-employee/" + appointment.getEmployeeId();

		String diagnosisUrl = "http://gateway-microservice:8080/diagnosis/api/appointment-diagnosis/"
				+ appointment.getAppointmentId();
		String medicationUrl = "http://gateway-microservice:8080/medications/api/appointment-medications/"
				+ appointment.getAppointmentId();
		String procedureUrl = "http://gateway-microservice:8080/procedures/api/appointment-procedures/"
				+ appointment.getAppointmentId();

		Patient patient = patientService.getPatientDetails(patientUrl);
		Employee employee = employeeService.getEmployeeDetails(employeeUrl);
		Vital vital = vitalService.getVitalDetailsByAppointmentId(appointment.getAppointmentId());

		List<Diagnosis> diagnosisList = diagnosisService.diagnosisDetails(diagnosisUrl);
		List<Procedure> procedureList = procedureService.procedureDetails(procedureUrl);
		List<Medication> medicationList = medicationService.medicationDetails(medicationUrl);

		return createVisitReport(patient, employee, vital, diagnosisList, medicationList, procedureList, appointment);
	}

	private VisitReport createVisitReport(Patient patient, Employee employee, Vital vital,
			List<Diagnosis> diagnosisList, List<Medication> medicationList, List<Procedure> procedureList,
			Appointment appointment) {
		VisitReport report = new VisitReport();
		report.setAppointment(appointment);
		report.setPatient(patient);
		report.setPhysician(employee);
		report.setVitals(vital);
		report.setDiagnosis(diagnosisList);
		report.setMedications(medicationList);
		report.setProcedures(procedureList);
		return report;
	}

}
