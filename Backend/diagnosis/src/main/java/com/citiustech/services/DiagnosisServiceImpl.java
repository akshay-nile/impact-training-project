package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.citiustech.models.AppointmentDiagnosis;
import com.citiustech.models.Diagnosis;
import com.citiustech.repositories.AppointmentDiagnosisRepository;
import com.citiustech.repositories.DiagnosisRepository;

@Service
public class DiagnosisServiceImpl implements DiagnosisService{
	
	@Autowired
	private DiagnosisRepository diagnosisRepo;

	@Autowired
	private AppointmentDiagnosisRepository aptDiagnosisRepo;
	
	@Override
	public Diagnosis getDiagnosisDetailsByDiagnosisId(int diagnosisId) {
		return diagnosisRepo.findById(diagnosisId).get();
	}

	@Override
	public List<Diagnosis> getDiagnosisDetails() {
		return (List<Diagnosis>) diagnosisRepo.findAll();
	}

	@Override
	public List<Diagnosis> getDiagnosisByAptId(int aptId) {
		return diagnosisRepo.getDiagnosisByAptId(aptId);
	}

	@Override
	public AppointmentDiagnosis addDiagnosisByApiId(AppointmentDiagnosis aptDiagnosis) {
		return aptDiagnosisRepo.save(aptDiagnosis);
	}

	@Override
	public void deleteDiagnosisById(int id) {
		diagnosisRepo.deleteById(id);
	}

	@Override
	public Diagnosis addNewDiagnosis(Diagnosis diagnosis) {
		return diagnosisRepo.save(diagnosis);
	}
}
