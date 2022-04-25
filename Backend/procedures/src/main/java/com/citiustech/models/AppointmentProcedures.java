package com.citiustech.models;

import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppointmentProcedures {

	@Id
	private int appointmentId;
	
	@ElementCollection
	private Set<Integer> procedureIds;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public Set<Integer> getProcedureIds() {
		return procedureIds;
	}

	public void setProcedureIds(Set<Integer> procedureIds) {
		this.procedureIds = procedureIds;
	}
}
