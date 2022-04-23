package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Medication;

public interface MedicationService {

	public List<Medication> medicationDetails(String url);
}
