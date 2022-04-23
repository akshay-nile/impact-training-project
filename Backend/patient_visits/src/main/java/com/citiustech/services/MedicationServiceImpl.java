package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Medication;
import com.citiustech.utils.RestUtil;

@Service
public class MedicationServiceImpl implements MedicationService {

	@Autowired
	private RestUtil restUtil;

	public List<Medication> medicationDetails(String url) {
		return restUtil.performGetRequest(url, List.class);
	}

}
