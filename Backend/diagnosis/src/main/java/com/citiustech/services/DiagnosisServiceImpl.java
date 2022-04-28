package com.citiustech.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.AppointmentDiagnosis;
import com.citiustech.models.Diagnosis;
import com.citiustech.repositories.AppointmentDiagnosisRepository;
import com.citiustech.repositories.DiagnosisRepository;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {

	@Autowired
	private DiagnosisRepository diagnosisRepo;

	@Autowired
	private AppointmentDiagnosisRepository apptDiagnosisRepo;

	@Override
	public List<Diagnosis> getDiagnosisDetails() {
		return ((List<Diagnosis>) diagnosisRepo.findAll()).stream().limit(100).collect(Collectors.toList());
	}

	@Override
	public void deleteDiagnosisById(int id) {
		diagnosisRepo.deleteById(id);
	}

	@Override
	public Diagnosis addNewDiagnosis(Diagnosis diagnosis) {
		return diagnosisRepo.save(diagnosis);
	}

	@Override
	public List<Diagnosis> getDiagnosisByApppintmentId(int appointmentId) {
		AppointmentDiagnosis apptDiagnosis = apptDiagnosisRepo.findById(appointmentId).orElse(null);

		if (apptDiagnosis == null) {
			return List.of();
		}

		return apptDiagnosis.getDiagnosisIds().stream()
				.map(diagnosisId -> diagnosisRepo.findById(diagnosisId).orElse(null))
				.filter(diagnosis -> diagnosis != null).collect(Collectors.toList());
	}

	@Override
	public AppointmentDiagnosis addDiagnosisForAppointment(AppointmentDiagnosis appointmentDiagnosis) {
		return apptDiagnosisRepo.save(appointmentDiagnosis);
	}
}
