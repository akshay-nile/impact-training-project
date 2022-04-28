package com.citiustech.services;

import java.util.List;

import com.citiustech.models.AppointmentDiagnosis;
import com.citiustech.models.Diagnosis;

public interface DiagnosisService {

	public List<Diagnosis> getDiagnosisDetails();

	public void deleteDiagnosisById(int id);

	public Diagnosis addNewDiagnosis(Diagnosis diagnosis);

	public List<Diagnosis> getDiagnosisByApppintmentId(int appointmentId);

	public AppointmentDiagnosis addDiagnosisForAppointment(AppointmentDiagnosis appointmentDiagnosis);

}
