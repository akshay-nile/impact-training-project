package com.citiustech.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "verifications")
public class Verification {

	@Id
	@PrimaryKeyJoinColumn(name = "email")
	private String email;

	@Column
	private String otp;

	@Column(name = "expires_at")
	private long expiresAt;

	public Verification() {
		super();
	}

	public Verification(String email, String otp, long expiresAt) {
		super();
		this.email = email;
		this.otp = otp;
		this.expiresAt = expiresAt;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public long getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(long expiresAt) {
		this.expiresAt = expiresAt;
	}
}
