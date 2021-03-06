package com.citiustech.models;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.citiustech.models.constants.Status;
import com.citiustech.models.constants.Title;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "patients")
public class Patient {

	@Id
	@GenericGenerator(name = "patient_seq_gen", strategy = "com.citiustech.generators.PatientGenerator")
	@GeneratedValue(generator = "patient_seq_gen")
	private String patientId;

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
	

	@OneToOne(mappedBy="patient", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Nominee nominee;

	@OneToOne(mappedBy="patient", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Demographics demographics;

	@ElementCollection
	private Set<String> allergies;
	
	public Set<String> getAllergies() {
		return allergies;
	}
	
	public void setAllergies(Set<String> allergies) {
		this.allergies = allergies;
	}
	
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
