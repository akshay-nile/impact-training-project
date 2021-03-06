package com.citiustech.models;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppointmentDiagnosis {

	@Id
	private int appointmentId;
	
	@ElementCollection
	private List<Integer> diagnosisIds;
	
	public int getAppointmentId() {
		return appointmentId;
	}
	
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}
	
	public List<Integer> getDiagnosisIds() {
		return diagnosisIds;
	}
	
	public void setDiagnosisIds(List<Integer> diagnosisIds) {
		this.diagnosisIds = diagnosisIds;
	}
	
	
}
