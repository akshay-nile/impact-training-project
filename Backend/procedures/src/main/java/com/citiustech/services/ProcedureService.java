package com.citiustech.services;

import java.util.List;

import com.citiustech.models.AppointmentProcedures;
import com.citiustech.models.Procedure;

public interface ProcedureService {
	
	public List<Procedure> getProcedureDetails();

	public void deleteProcedureById(int id);

	public Procedure addNewProcedure(Procedure procedure);

	public AppointmentProcedures addProceduresForAppointment(AppointmentProcedures appointmentProcedures);

	public List<Procedure> getProceduresByAppointmentId(int appointmentId);
}
