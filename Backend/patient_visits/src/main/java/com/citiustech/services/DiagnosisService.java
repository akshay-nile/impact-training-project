package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Diagnosis;

public interface DiagnosisService {

	public List<Diagnosis> diagnosisDetails(String url);
}
