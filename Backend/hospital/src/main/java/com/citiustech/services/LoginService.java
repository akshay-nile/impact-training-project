package com.citiustech.services;

import java.util.Map;

public interface LoginService {

	public boolean isEmailExist(String email);

	public Object login(Map<String, String> credentials);

	public void blockAccountByEmail(String email);

}
