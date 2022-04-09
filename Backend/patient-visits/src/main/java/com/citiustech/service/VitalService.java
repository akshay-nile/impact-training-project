package com.citiustech.service;

import java.util.List;

import com.citiustech.model.Vital;

public interface VitalService {

	public Vital getVitalDetailsByAptId(int vitalId);

	public List<Vital> getVitalDetails();

	public Vital saveVitalDetails(Vital vital);

	public Vital deleteVitalDetails(int vitalId);
	
	public Vital getVitalDetailsByPatientId(int aptId);
}
