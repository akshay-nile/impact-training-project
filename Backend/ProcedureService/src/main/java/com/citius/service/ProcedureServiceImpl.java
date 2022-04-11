package com.citius.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citius.model.Procedure;
import com.citius.repository.ProcedureRepository;

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

}
