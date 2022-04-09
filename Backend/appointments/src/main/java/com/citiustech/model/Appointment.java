package com.citiustech.model;

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

	private String patientName;

	private String time;

	private LocalDate aptDate;

	private int empId;

	public Appointment(int aptId, String meetingTitle, String description, String patientEmail, String physician,
			String editHistory, String patientName, String time, LocalDate aptDate, int empId) {
		super();
		this.aptId = aptId;
		this.meetingTitle = meetingTitle;
		this.description = description;
		this.patientEmail = patientEmail;
		this.physician = physician;
		this.editHistory = editHistory;
		this.patientName = patientName;
		this.time = time;
		this.aptDate = aptDate;
		this.empId = empId;
	}

	public Appointment() {
		super();
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
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

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
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

}
