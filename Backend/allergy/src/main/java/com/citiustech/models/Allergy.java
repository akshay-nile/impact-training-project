package com.citiustech.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Allergy {

	@Id
	private String allergyId;
	
	private String allergyType;
	
	private String allergyName;
	
	private String allergySource;
	
	private String allergySequence;
	
	private String allerginicity;

	public Allergy() {
		super();
	}

	public Allergy(String allergyId, String allergyType, String allergyName, String allergySource, String allergySequence,
			String allerginicity) {
		super();
		this.allergyId = allergyId;
		this.allergyType = allergyType;
		this.allergyName = allergyName;
		this.allergySource = allergySource;
		this.allergySequence = allergySequence;
		this.allerginicity = allerginicity;
	}

	public String getAllergyId() {
		return allergyId;
	}

	public void setAllergyId(String allergyId) {
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

	public String getAllergySource() {
		return allergySource;
	}

	public void setAllergySource(String allergySource) {
		this.allergySource = allergySource;
	}

	public String getAllergySequence() {
		return allergySequence;
	}

	public void setAllergySequence(String allergySequence) {
		this.allergySequence = allergySequence;
	}

	public String getAllerginicity() {
		return allerginicity;
	}

	public void setAllerginicity(String allerginicity) {
		this.allerginicity = allerginicity;
	}
	
}
