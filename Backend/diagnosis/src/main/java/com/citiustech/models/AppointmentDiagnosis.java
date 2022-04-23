package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AppointmentDiagnosis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int diagnosisId;
	private int aptId;

	public AppointmentDiagnosis() {
		super();
	}

	public AppointmentDiagnosis(int id, int diagnosisId, int aptId) {
		super();
		this.id = id;
		this.diagnosisId = diagnosisId;
		this.aptId = aptId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDiagnosisId() {
		return diagnosisId;
	}

	public void setDiagnosisId(int diagnosisId) {
		this.diagnosisId = diagnosisId;
	}

	public int getAptId() {
		return aptId;
	}

	public void setAptId(int aptId) {
		this.aptId = aptId;
	}
}
