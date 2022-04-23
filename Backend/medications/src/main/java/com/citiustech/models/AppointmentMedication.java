package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AppointmentMedication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int medicationId;
	private int aptId;
	public AppointmentMedication() {
		super();
	}
	public AppointmentMedication(int id, int medicationId, int aptId) {
		super();
		this.id = id;
		this.medicationId = medicationId;
		this.aptId = aptId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMedicationId() {
		return medicationId;
	}
	public void setMedicationId(int medicationId) {
		this.medicationId = medicationId;
	}
	public int getAptId() {
		return aptId;
	}
	public void setAptId(int aptId) {
		this.aptId = aptId;
	}
}
