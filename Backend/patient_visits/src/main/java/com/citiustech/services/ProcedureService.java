package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Procedure;

public interface ProcedureService {

	public List<Procedure> procedureDetails(String url);
}
