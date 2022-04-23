package com.citiustech.models;

import java.time.LocalDate;

import com.citiustech.models.constants.Status;
import com.citiustech.models.constants.Title;

public class Patient {

	private String patientId;

	private Title title;

	private String firstName;

	private String lastName;

	private String email;

	private String phone;

	private LocalDate birthdate;

	private int password;

	private Status status = Status.ACTIVE;

	private Nominee nominee;

	private Demographics demographics;

	public Nominee getNominee() {
		return nominee;
	}

	public void setNominee(Nominee nominee) {
		this.nominee = nominee;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public Title getTitle() {
		return title;
	}

	public void setTitle(Title title) {
		this.title = title;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public int getPassword() {
		return password;
	}

	public void setPassword(Object password) {
		if (password instanceof String) {
			this.password = password.toString().hashCode();
		} else if (password instanceof Integer) {
			this.password = (int) password;
		} else {
			throw new RuntimeException("Invalid datatype for password !");
		}
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Demographics getDemographics() {
		return demographics;
	}

	public void setDemographics(Demographics demographics) {
		this.demographics = demographics;
	}

}
