package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Medication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int medicationId;
		
	private String medicationName;
	
	private String dosage;
	
	private String description;
	
	public Medication() {
		super();
	}

	public Medication(int medicationId, String medicationName, String dosage, String description) {
		super();
		this.medicationId = medicationId;
		this.medicationName = medicationName;
		this.dosage = dosage;
		this.description = description;
	}

	public int getMedicationId() {
		return medicationId;
	}

	public void setMedicationId(int medicationId) {
		this.medicationId = medicationId;
	}

	public String getMedicationName() {
		return medicationName;
	}

	public void setMedicationName(String medicationName) {
		this.medicationName = medicationName;
	}

	public String getDosage() {
		return dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
