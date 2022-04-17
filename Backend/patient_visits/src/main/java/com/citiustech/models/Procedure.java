package com.citiustech.models;

public class Procedure {

	private int procedureId;

	private String procedureName;

	private String description;

	public Procedure() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Procedure(int procedureId, String procedureName, String description) {
		super();
		this.procedureId = procedureId;
		this.procedureName = procedureName;
		this.description = description;
	}

	public int getProcedureId() {
		return procedureId;
	}

	public void setProcedureId(int procedureId) {
		this.procedureId = procedureId;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
