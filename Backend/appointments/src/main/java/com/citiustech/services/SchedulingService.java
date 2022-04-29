package com.citiustech.services;

import java.time.LocalDate;
import java.util.List;

import com.citiustech.models.Window;

public interface SchedulingService {

	public List<Window> getAvailabilityWindows(LocalDate date, String patientId, String employeeId, int skip);
}
