package com.citiustech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Patient;
import com.citiustech.utils.RestUtil;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private RestUtil restUtil;

	public Patient getPatientDetails(String url) {
		return restUtil.performGetRequest(url, Patient.class);
	}

}
