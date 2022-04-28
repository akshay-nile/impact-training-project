package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Allergy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int allergyId;

	private String allergyType;

	private String allergyName;

	public int getAllergyId() {
		return allergyId;
	}

	public void setAllergyId(int allergyId) {
		this.allergyId = allergyId;
	}

	public String getAllergyType() {
		return allergyType;
	}

	public void setAllergyType(String allergyType) {
		this.allergyType = allergyType;
	}

	public String getAllergyName() {
		return allergyName;
	}

	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

}
