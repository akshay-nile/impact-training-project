package com.citiustech.hospital.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.citiustech.hospital.models.constants.Status;
import com.citiustech.hospital.models.constants.Title;

@Entity
@Table(name = "patients")
public class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int patientId;

	@Column
	private Title title;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@Column(unique = true)
	private String email;

	@Column(unique = true)
	private String phone;

	@Column
	private LocalDate birthdate;

	@Column(nullable = false)
	private int password;

	@Column
	private Status status = Status.ACTIVE;

	@OneToOne(mappedBy = "patient")
	private Nominee nominee;

	@OneToOne(mappedBy = "patient")
	private Demographics demographics;

	public Nominee getNominee() {
		return nominee;
	}

	public void setNominee(Nominee nominee) {
		this.nominee = nominee;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
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
