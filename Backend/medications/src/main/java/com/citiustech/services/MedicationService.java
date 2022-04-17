package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Medication;

public interface MedicationService {

	public List<Medication> getMedicationDetails();

	public Medication getMedicationDetailsById(int medicationId);

	public List<Medication> getMedicationByAptId(int aptId);
	
}
