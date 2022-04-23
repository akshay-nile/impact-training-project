package com.citiustech.services;

import java.util.List;

import com.citiustech.models.AppointmentMedication;
import com.citiustech.models.Medication;

public interface MedicationService {

	public List<Medication> getMedicationDetails();

	public Medication getMedicationDetailsById(int medicationId);

	public List<Medication> getMedicationByAptId(int aptId);

	public AppointmentMedication getMedicationByAptId(AppointmentMedication appointmentMedication);

	public void deleteMedicationById(int id);

	public Medication addNewMedication(Medication medication);

}
