package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Vital;
import com.citiustech.repositories.VitalRepository;
import com.citiustech.utils.RestUtil;

@Service
public class VitalServiceImpl implements VitalService {

	@Autowired
	private VitalRepository vitalRepo;

	@Autowired
	private RestUtil restUtil;

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
	public Vital getVitalDetailsByAppointmentId(int appointmentId) {
		return vitalRepo.getVitalDetailsByAppointmentId(appointmentId);
	}

	@Override
	public Vital getVitalDetails(String url) {
		return restUtil.performGetRequest(url, Vital.class);
	}

}
