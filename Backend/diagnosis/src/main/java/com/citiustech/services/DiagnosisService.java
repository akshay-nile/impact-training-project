package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Diagnosis;

public interface DiagnosisService {

	public List<Diagnosis> getDiagnosisDetails();

	public Diagnosis getDiagnosisDetailsByDiagnosisId(int diagnosisId);

	public List<Diagnosis> getDiagnosisByAptId(int aptId);
}
