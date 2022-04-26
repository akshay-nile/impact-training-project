package com.citiustech.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.AppointmentMedications;
import com.citiustech.models.Medication;
import com.citiustech.repositories.AppointmentMedicationsRepository;
import com.citiustech.repositories.MedicationRepository;

@Service
public class MedicationServiceImpl implements MedicationService {

	@Autowired
	private MedicationRepository medicationRepo;

	@Autowired
	private AppointmentMedicationsRepository apptMedicationsRepo;

	@Override
	public Medication getMedicationDetailsById(int medicationId) {
		return medicationRepo.findById(medicationId).get();
	}

	@Override
	public List<Medication> getMedicationDetails() {
		return ((List<Medication>) medicationRepo.findAll()).stream().limit(100).collect(Collectors.toList());
	}

	@Override
	public void deleteMedicationById(int id) {
		medicationRepo.deleteById(id);
	}

	@Override
	public Medication addNewMedication(Medication medication) {
		return medicationRepo.save(medication);
	}

	@Override
	public List<Medication> getMedicationsByApppintmentId(int appointmentId) {
		AppointmentMedications apptMedications = apptMedicationsRepo.findById(appointmentId).orElse(null);

		if (apptMedications == null) {
			return List.of();
		}

		return apptMedications.getMedicationIds().stream()
				.map(medicationId -> medicationRepo.findById(medicationId).orElse(null))
				.filter(medication -> medication != null).collect(Collectors.toList());
	}

	@Override
	public AppointmentMedications addMedicationsForAppointment(AppointmentMedications appointmentMedications) {
		return apptMedicationsRepo.save(appointmentMedications);
	}
}
