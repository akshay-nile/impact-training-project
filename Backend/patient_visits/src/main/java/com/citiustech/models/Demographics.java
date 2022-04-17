package com.citiustech.models;

import com.citiustech.models.constants.Language;

public class Demographics {

	private int demographicsId;

	private int age;

	private String gender;

	private String race;

	private String ethnicity;

	private Language language;

	private String address;

	public int getDemographicsId() {
		return demographicsId;
	}

	public void setDemographicsId(int demographicsId) {
		this.demographicsId = demographicsId;
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
