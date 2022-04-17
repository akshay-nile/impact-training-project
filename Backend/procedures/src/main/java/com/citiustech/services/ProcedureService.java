package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Procedure;

public interface ProcedureService {

	public Procedure getProcedureDetailsByProcedureId(int procedureId);

	public List<Procedure> getProcedureDetails();

	public List<Procedure> getProcedureByAptId(int aptId);

}
