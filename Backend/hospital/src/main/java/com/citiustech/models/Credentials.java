package com.citiustech.models;

public class Credentials {

	private int employeeId;
	private int password;

	public Credentials() {
		super();
	}

	public Credentials(int employeeId, int password) {
		super();
		this.employeeId = employeeId;
		this.password = password;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public int getPassword() {
		return password;
	}

	public void setPassword(int password) {
		this.password = password;
	}
}
