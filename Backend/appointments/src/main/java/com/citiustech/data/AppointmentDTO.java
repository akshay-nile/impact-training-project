package com.citiustech.data;

import com.citiustech.models.constants.Status;

public class AppointmentDTO {

	private int appointmentId;
	private String date;
	private String time;

	private Status status;

	private String editHistory;
	private String editedBy;
	
	public int getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
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
}
