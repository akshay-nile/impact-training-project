package com.citiustech.services;

import java.util.List;

import com.citiustech.models.AppointmentProcedures;
import com.citiustech.models.Procedure;

public interface ProcedureService {
	
	public Procedure getProcedureDetailsByProcedureId(int procedureId);

	public List<Procedure> getProcedureDetails(int start, int count);

	public void deleteProcedureById(int id);

	public Procedure addProcedure(Procedure procedure);

	public Procedure addNewProcedure(Procedure procedure);

	public AppointmentProcedures addProceduresForAppointment(AppointmentProcedures appointmentProcedures);

	public List<Procedure> getProceduresByAppointmentId(int appointmentId);
}
