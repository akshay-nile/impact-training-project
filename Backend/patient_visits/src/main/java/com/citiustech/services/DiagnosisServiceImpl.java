package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Diagnosis;
import com.citiustech.utils.RestUtil;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {

	@Autowired
	private RestUtil restUtil;

	public List<Diagnosis> diagnosisDetails(String url) {
		return restUtil.performGetRequest(url, List.class);
	}

}
