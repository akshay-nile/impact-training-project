package com.citiustech.models;

import java.util.List;

public class VisitReport {
	private Patient patient;
	private Employee physician;
	private Appointment appointment;
	private Vital vitals;
	private List<Medication> medications;
	private List<Procedure> procedures;
	private List<Diagnosis> diagnosis;
	public VisitReport() {
		super();
	}
	public VisitReport(Patient patient, Employee physician, Appointment appointment, Vital vitals,
			List<Medication> medications, List<Procedure> procedures, List<Diagnosis> diagnosis) {
		super();
		this.patient = patient;
		this.physician = physician;
		this.appointment = appointment;
		this.vitals = vitals;
		this.medications = medications;
		this.procedures = procedures;
		this.diagnosis = diagnosis;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Employee getPhysician() {
		return physician;
	}
	public void setPhysician(Employee physician) {
		this.physician = physician;
	}
	public Appointment getAppointment() {
		return appointment;
	}
	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}
	public Vital getVitals() {
		return vitals;
	}
	public void setVitals(Vital vitals) {
		this.vitals = vitals;
	}
	public List<Medication> getMedications() {
		return medications;
	}
	public void setMedications(List<Medication> medications) {
		this.medications = medications;
	}
	public List<Procedure> getProcedures() {
		return procedures;
	}
	public void setProcedures(List<Procedure> procedures) {
		this.procedures = procedures;
	}
	public List<Diagnosis> getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(List<Diagnosis> diagnosis) {
		this.diagnosis = diagnosis;
	}

}
