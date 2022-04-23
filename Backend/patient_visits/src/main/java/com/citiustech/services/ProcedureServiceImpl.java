package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Procedure;
import com.citiustech.utils.RestUtil;

@Service
public class ProcedureServiceImpl implements ProcedureService {

	@Autowired
	private RestUtil restUtil;

	public List<Procedure> procedureDetails(String url) {
		return restUtil.performGetRequest(url, List.class);
	}

}
