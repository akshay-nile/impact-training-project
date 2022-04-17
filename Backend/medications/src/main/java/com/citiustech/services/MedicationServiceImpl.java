package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Medication;
import com.citiustech.repositories.MedicationRepository;

@Service
public class MedicationServiceImpl implements MedicationService {

	@Autowired
	private MedicationRepository medicationRepo;
	
	@Override
	public Medication getMedicationDetailsById(int medicationId) {
		return medicationRepo.findById(medicationId).get();
	}

	@Override
	public List<Medication> getMedicationDetails() {
		return (List<Medication>) medicationRepo.findAll();
	}

	@Override
	public List<Medication> getMedicationByAptId(int aptId) {
		return medicationRepo.getMedicationByAptId(aptId);
	}
}
