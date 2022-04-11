package com.citius.service;

import java.util.List;

import com.citius.model.Procedure;

public interface ProcedureService {

	public Procedure getProcedureDetailsByProcedureId(int procedureId);

	public List<Procedure> getProcedureDetails();

}
