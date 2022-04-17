package com.citiustech.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int aptId;

	private String meetingTitle;

	private String description;

	private String patientEmail;

	private String physician;

	private String editHistory;

	private String time;

	private LocalDate aptDate;

	private int empId;

	private boolean isDataCollectionAppt=false;

	private boolean dataStatus=false;

	public Appointment() {
		super();
	}

	public Appointment(int aptId, String meetingTitle, String description, String patientEmail, String physician,
			String editHistory, String time, LocalDate aptDate, int empId, boolean isDataCollectionAppt,
			boolean dataStatus) {
		super();
		this.aptId = aptId;
		this.meetingTitle = meetingTitle;
		this.description = description;
		this.patientEmail = patientEmail;
		this.physician = physician;
		this.editHistory = editHistory;
		this.time = time;
		this.aptDate = aptDate;
		this.empId = empId;
		this.isDataCollectionAppt = isDataCollectionAppt;
		this.dataStatus = dataStatus;
	}

	public int getAptId() {
		return aptId;
	}

	public void setAptId(int aptId) {
		this.aptId = aptId;
	}

	public String getMeetingTitle() {
		return meetingTitle;
	}

	public void setMeetingTitle(String meetingTitle) {
		this.meetingTitle = meetingTitle;
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

	public String getPhysician() {
		return physician;
	}

	public void setPhysician(String physician) {
		this.physician = physician;
	}

	public String getEditHistory() {
		return editHistory;
	}

	public void setEditHistory(String editHistory) {
		this.editHistory = editHistory;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public LocalDate getAptDate() {
		return aptDate;
	}

	public void setAptDate(LocalDate aptDate) {
		this.aptDate = aptDate;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public boolean isDataCollectionAppt() {
		return isDataCollectionAppt;
	}

	public void setDataCollectionAppt(boolean isDataCollectionAppt) {
		this.isDataCollectionAppt = isDataCollectionAppt;
	}

	public boolean isDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(boolean dataStatus) {
		this.dataStatus = dataStatus;
	}

}
