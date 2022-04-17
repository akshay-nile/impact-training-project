package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Diagnosis;
import com.citiustech.repositories.DiagnosisRepository;

@Service
public class DiagnosisServiceImpl implements DiagnosisService{
	
	@Autowired
	private DiagnosisRepository diagnosisRepo;
	
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
}
