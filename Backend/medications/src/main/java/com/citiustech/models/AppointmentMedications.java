package com.citiustech.models;

import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppointmentMedications {
	
	@Id
	private int appointmentId;
	
	@ElementCollection
	private Set<Integer> medicationIds;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Set<Integer> getMedicationIds() {
		return medicationIds;
	}

	public void setMedicationIds(Set<Integer> medicationIds) {
		this.medicationIds = medicationIds;
	}
	
}
