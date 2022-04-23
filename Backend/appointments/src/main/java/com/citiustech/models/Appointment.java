package com.citiustech.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.citiustech.models.constants.Status;

@Entity
@Table(name = "appointments")
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentId;

	private String title;
	private String description;

	private String patientId;
	private String employeeId;
	private LocalDate date;
	private String time;

	private Status status;

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

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
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

	public boolean getIsDataCollectionAppt() {
		return isDataCollectionAppt;
	}

	public void setIsDataCollectionAppt(boolean isDataCollectionAppt) {
		this.isDataCollectionAppt = isDataCollectionAppt;
	}

	public boolean getDataCollectionStatus() {
		return dataCollectionStatus;
	}

	public void setDataCollectionStatus(boolean dataCollectionStatus) {
		this.dataCollectionStatus = dataCollectionStatus;
	}

}
