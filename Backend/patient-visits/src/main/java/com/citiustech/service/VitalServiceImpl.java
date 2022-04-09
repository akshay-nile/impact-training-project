package com.citiustech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Vital;
import com.citiustech.repository.VitalRepository;

@Service
public class VitalServiceImpl implements VitalService {

	@Autowired
	private VitalRepository vitalRepo;

	@Override
	public Vital getVitalDetailsByAptId(int vitalId) {
		return vitalRepo.findById(vitalId).get();
	}

	@Override
	public List<Vital> getVitalDetails() {
		return (List<Vital>) vitalRepo.findAll();
	}

	@Override
	public Vital saveVitalDetails(Vital vital) {
		return vitalRepo.save(vital);
	}

	@Override
	public Vital deleteVitalDetails(int vitalId) {
		Vital vital = vitalRepo.findById(vitalId).orElse(null);
		if (vital != null) {
			vitalRepo.deleteById(vitalId);

		}
		return vital;
	}

	@Override
	public Vital getVitalDetailsByPatientId(int aptId) {
		return vitalRepo.getVitalDetailsByPatientId(aptId);
	}

}