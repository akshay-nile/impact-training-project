package com.citiustech.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.citiustech.models.AppointmentDiagnosis;
import com.citiustech.models.Diagnosis;

public interface DiagnosisService {

	public List<Diagnosis> getDiagnosisDetails();

	public Diagnosis getDiagnosisDetailsByDiagnosisId(int diagnosisId);

	public List<Diagnosis> getDiagnosisByAptId(int aptId);

	public AppointmentDiagnosis addDiagnosisByApiId(AppointmentDiagnosis aptDiagnosis);

	public void deleteDiagnosisById(int id);

	public Diagnosis addNewDiagnosis(Diagnosis diagnosis);
	
}
