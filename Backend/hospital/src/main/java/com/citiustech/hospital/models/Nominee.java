package com.citiustech.hospital.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.citiustech.hospital.models.constants.Relation;

@Entity
@Table(name = "nominees")
public class Nominee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int nomineeId;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "patient_id")
	private Patient patient;
	
	@Column
	private String title;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@Column
	private Relation relation;
	
	@Column
	private String email;	

	@Column
	private String phone;
	
	@Column
	private String address;
	
	@Column(name = "access_allowed")
	private boolean isAccessAllowed;

	public int getNomineeId() {
		return nomineeId;
	}
	
	public void setNomineeId(int nomineeId) {
		this.nomineeId = nomineeId;
	}
	
	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
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

	public Relation getRelation() {
		return relation;
	}

	public void setRelation(Relation relation) {
		this.relation = relation;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isAccessAllowed() {
		return isAccessAllowed;
	}

	public void setAccessAllowed(boolean isAccessAllowed) {
		this.isAccessAllowed = isAccessAllowed;
	}
	
}
