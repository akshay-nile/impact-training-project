package com.citiustech.services;

import com.citiustech.models.Patient;

public interface RegistrationService {

	public Patient register(Patient patient);

	public Employee register(Employee employee);
}
