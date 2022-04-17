package com.citiustech.models;

public class Diagnosis {

	private int diagnosisId;
		
	private String title;

	public Diagnosis() {
		super();
	}
	
	public Diagnosis(int diagnosisId, String title) {
		super();
		this.diagnosisId = diagnosisId;
		this.title = title;
	}

	public int getDiagnosisId() {
		return diagnosisId;
	}

	public void setDiagnosisId(int diagnosisId) {
		this.diagnosisId = diagnosisId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
}
