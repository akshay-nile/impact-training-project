package com.citiustech.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.citiustech.models.constants.Role;
import com.citiustech.models.constants.Status;
import com.citiustech.models.constants.Title;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int employeeId;

	@Column
	private Title title;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@Column
	private LocalDate birthdate;

	@Column(unique = true)
	private String email;

	@Column(nullable = false)
	private Role role;

	@Column
	private String specialization;

	@Column
	private int password = "Password@123".hashCode();

	@Column
	private Status status = Status.ACTIVE;

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
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

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate birthdate) {
		this.birthdate = birthdate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
}
