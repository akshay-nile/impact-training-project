package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.AppointmentProcedure;
import com.citiustech.models.Procedure;
import com.citiustech.repositories.AppointmentProcedureRepository;
import com.citiustech.repositories.ProcedureRepository;

@Service
public class ProcedureServiceImpl implements ProcedureService {

	@Autowired
	private ProcedureRepository procedureRepo;

	@Autowired
	private AppointmentProcedureRepository aptprocedureRepo;

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

	@Override
	public AppointmentProcedure addProcedureByApiId(AppointmentProcedure aptProcedure) {
		return aptprocedureRepo.save(aptProcedure);
	}

	@Override
	public void deleteProcedureById(int id) {
		procedureRepo.deleteById(id);
	}

	@Override
	public Procedure addProcedure(Procedure procedure) {
		return procedureRepo.save(procedure);
	}

	@Override
	public Procedure addNewProcedure(Procedure procedure) {
		return procedureRepo.save(procedure);
	}

}