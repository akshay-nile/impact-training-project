package com.citiustech.hospital.models;

public class UserCredentials {
	private int userId;
	private String oldPassword;
	private String newPassword;
	public UserCredentials() {
		super();
	}
	public UserCredentials(int userId, String oldPassword, String newPassword) {
		super();
		this.userId = userId;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
}
