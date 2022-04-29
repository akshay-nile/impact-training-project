package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Appointment;
import com.citiustech.models.Diagnosis;
import com.citiustech.models.Employee;
import com.citiustech.models.Medication;
import com.citiustech.models.Patient;
import com.citiustech.models.Procedure;
import com.citiustech.models.Vital;
import com.citiustech.utils.TestDataUtil;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;

@ExtendWith(MockitoExtension.class)
class VisitServiceImplTest {

	@InjectMocks
	private VisitServiceImpl visitServiceImpl;

	@Mock
	private DiagnosisServiceImpl diagnosisServiceImpl;

	@Mock
	private EmployeeService employeeService;

	@Mock
	private MedicationService medicationService;

	@Mock
	private PatientService patientService;

	@Mock
	private ProcedureService procedureService;

	@Mock
	private VitalService vitalService;

	private String url;
	private Appointment appointment;
	private List<Procedure> procedureList;
	private Procedure procedure;
	private List<Diagnosis> diagnosisList;
	private Diagnosis diagnosis;
	private Employee employee;
	private List<Medication> medicationList;
	private Medication medication;
	private Patient patient;
	private Vital vital;
	private TestDataUtil testDataUtil;

	@BeforeEach
	public void setUp() throws StreamReadException, DatabindException, IOException {
		url = "http://localhost:8089/procedure/api/procedureByAptId/1";
		testDataUtil = new TestDataUtil();
		patient = testDataUtil.getPatient();
		employee = testDataUtil.getEmployee();
		appointment = testDataUtil.getAppointment();
		procedureList = new ArrayList<>();
		procedure = new Procedure();
		procedure.setDescription("Procedure 1");
		procedureList.add(procedure);
		diagnosisList = new ArrayList<>();
		diagnosis = new Diagnosis();
		diagnosis.setDiagnosisId(1);
		diagnosis.setTitle("Diagnosis 1");
		diagnosisList.add(diagnosis);
		medicationList = new ArrayList<>();
		medication = new Medication();
		medication.setDescription("Medication 1");
		medicationList.add(medication);
		vital = new Vital();
		vital.setBodyTemperature("97");
	}

	@AfterEach
	public void tearDown() {
		url = null;
		appointment = null;

	}

	@Test
	@DisplayName("Test Method to get visit report")
	public void testMethodToGetVisitReport() {
		when(patientService.getPatientDetails(any())).thenReturn(patient);
		when(employeeService.getEmployeeDetails(any())).thenReturn(employee);
		when(diagnosisServiceImpl.diagnosisDetails(any())).thenReturn(diagnosisList);
		when(procedureService.procedureDetails(any())).thenReturn(procedureList);
		when(medicationService.medicationDetails(any())).thenReturn(medicationList);

		Patient patient = visitServiceImpl.getVisitReport(appointment).getPatient();
		assertNotNull(patient.getEmail());
		assertNotNull(patient.getFirstName());
		assertNotNull(patient.getLastName());
		assertNotNull(patient.getPassword());
		assertNotNull(patient.getPatientId());
		assertNotNull(patient.getPhone());
		assertNotNull(patient.getStatus());
		assertNotNull(patient.getTitle());
		assertNotNull(patient.getDemographics().getDemographicsId());
		assertNotNull(patient.getDemographics().getAge());
		assertNotNull(patient.getDemographics().getAddress());
		assertNotNull(patient.getDemographics().getEthnicity());
		assertNotNull(patient.getDemographics().getRace());
		assertNotNull(patient.getDemographics().getLanguage());
		assertNotNull(patient.getDemographics().getGender());
		assertNotNull(patient.getNominee().getAddress());
		assertNotNull(patient.getNominee().getEmail());
		assertNotNull(patient.getNominee().getLastName());
		assertNotNull(patient.getNominee().getFirstName());
		assertNotNull(patient.getNominee().getNomineeId());
		assertNotNull(patient.getNominee().getPhone());
		assertNotNull(patient.getNominee().getRelation());
		assertNotNull(patient.getNominee().getTitle());
		Employee emp = visitServiceImpl.getVisitReport(appointment).getPhysician();

		assertNotNull(emp.getEmployeeId());
		assertNotNull(emp.getEmail());
		assertNotNull(emp.getFirstName());
		assertNotNull(emp.getLastName());
		assertNotNull(emp.getPassword());
		assertNotNull(emp.getRole());
		assertNotNull(emp.getRole());
		assertNotNull(emp.getSpecialization());
		assertNotNull(emp.getStatus());
		assertNotNull(emp.getTitle());

	}

}
