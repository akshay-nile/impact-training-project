package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Procedure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int procedureId;
	
	private String procedureName;
	
	private String description;
	
	public Procedure() {
		super();
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
