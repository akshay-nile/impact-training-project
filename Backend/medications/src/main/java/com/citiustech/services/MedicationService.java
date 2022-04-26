package com.citiustech.services;

import java.util.List;

import com.citiustech.models.AppointmentMedications;
import com.citiustech.models.Medication;

public interface MedicationService {

	public List<Medication> getMedicationDetails();

	public Medication getMedicationDetailsById(int medicationId);

	public void deleteMedicationById(int id);

	public Medication addNewMedication(Medication medication);

	public List<Medication> getMedicationsByApppintmentId(int appointmentId);

	public AppointmentMedications addMedicationsForAppointment(AppointmentMedications appointmentMedications);

}
