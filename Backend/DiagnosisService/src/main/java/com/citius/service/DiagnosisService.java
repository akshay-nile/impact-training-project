package com.citius.service;

import java.util.List;

import com.citius.model.Diagnosis;

public interface DiagnosisService {

	public List<Diagnosis> getDiagnosisDetails();

	public Diagnosis getDiagnosisDetailsByDiagnosisId(int diagnosisId);
}
