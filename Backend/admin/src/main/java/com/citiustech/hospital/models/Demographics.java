package com.citiustech.hospital.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.citiustech.hospital.models.constants.Language;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "demographics")
public class Demographics {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int demographicsId;
	
	@OneToOne
	@JoinColumn(name = "patient_id")
	@JsonBackReference
	private Patient patient;
	
	@Column
	private int age;
	
	@Column
	private String gender;
	
	@Column
	private String race;
	
	@Column
	private String ethnicity;
	
	@Column
	private Language language;
	
	@Column
	private String address;

	public int getDemographicsId() {
		return demographicsId;
	}

	public void setDemographicsId(int demographicsId) {
		this.demographicsId = demographicsId;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public String getEthnicity() {
		return ethnicity;
	}

	public void setEthnicity(String ethnicity) {
		this.ethnicity = ethnicity;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
}
