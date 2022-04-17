package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Procedure;
import com.citiustech.repositories.ProcedureRepository;

@Service
public class ProcedureServiceImpl implements ProcedureService{

	@Autowired
	private ProcedureRepository procedureRepo;
	
	@Override
	public Procedure getProcedureDetailsByProcedureId(int procedureId) {
		return procedureRepo.findById(procedureId).get();
	}

	@Override
	public List<Procedure> getProcedureDetails() {
		return (List<Procedure>) procedureRepo.findAll();
	}

	@Override
	public List<Procedure> getProcedureByAptId(int aptId) {
		return procedureRepo.getProcedureByAptId(aptId);
	}

}
