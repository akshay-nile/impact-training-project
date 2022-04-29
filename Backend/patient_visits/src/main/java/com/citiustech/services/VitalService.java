package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Vital;

public interface VitalService {

	public Vital getVitalDetailsByAptId(int vitalId);

	public List<Vital> getVitalDetails();

	public Vital saveVitalDetails(Vital vital);

	public Vital deleteVitalDetails(int vitalId);
	
	public Vital getVitalDetailsByAppointmentId(int appointmentId);
	
	public Vital getVitalDetails(String url);

}
