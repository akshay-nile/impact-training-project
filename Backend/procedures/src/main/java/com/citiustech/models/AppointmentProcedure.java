package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AppointmentProcedure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int procedureId;
	private int aptId;
	public AppointmentProcedure() {
		super();
	}

	public AppointmentProcedure(int id, int procedureId, int aptId) {
		super();
		this.id = id;
		this.procedureId = procedureId;
		this.aptId = aptId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProcedureId() {
		return procedureId;
	}
	public void setProcedureId(int procedureId) {
		this.procedureId = procedureId;
	}
	public int getAptId() {
		return aptId;
	}
	public void setAptId(int aptId) {
		this.aptId = aptId;
	}
}
