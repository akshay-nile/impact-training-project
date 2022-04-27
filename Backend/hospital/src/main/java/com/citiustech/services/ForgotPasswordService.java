package com.citiustech.services;

import java.util.Map;

public interface ForgotPasswordService {

	public boolean sendOtpEmail(String toEmail);
	
	public String resetPasswordByOtp(Map<String, String> passUpdate);
	
}
