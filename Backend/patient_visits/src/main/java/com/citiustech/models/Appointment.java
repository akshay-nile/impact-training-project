package com.citiustech.models;

import java.time.LocalDate;

public class Appointment {

	private int appointmentId;

	private String title;
	private String description;

	private String patientEmail;
	private String employeeEmail;
	private String patientId;
	private String employeeId;
	private String employeeName;

	private LocalDate date;
	private String time;

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	private String status;

	private String editHistory;
	private String editedBy;

	private boolean isDataCollectionAppt = false;
	private boolean dataCollectionStatus = false;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPatientEmail() {
		return patientEmail;
	}

	public void setPatientEmail(String patientEmail) {
		this.patientEmail = patientEmail;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}
	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEditHistory() {
		return editHistory;
	}

	public void setEditHistory(String editHistory) {
		this.editHistory = editHistory;
	}

	public String getEditedBy() {
		return editedBy;
	}

	public void setEditedBy(String editedBy) {
		this.editedBy = editedBy;
	}

	public boolean isDataCollectionAppt() {
		return isDataCollectionAppt;
	}

	public void setDataCollectionAppt(boolean isDataCollectionAppt) {
		this.isDataCollectionAppt = isDataCollectionAppt;
	}

	public boolean isDataCollectionStatus() {
		return dataCollectionStatus;
	}

	public void setDataCollectionStatus(boolean dataCollectionStatus) {
		this.dataCollectionStatus = dataCollectionStatus;
	}
}
