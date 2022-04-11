package com.citius.service;

import java.util.List;

import com.citius.model.Medication;

public interface MedicationService {

	public List<Medication> getMedicationDetails();

	public Medication getMedicationDetailsById(int medicationId);
	
}
