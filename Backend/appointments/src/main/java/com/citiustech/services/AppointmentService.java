package com.citiustech.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.citiustech.models.Appointment;

public interface AppointmentService {

	public Appointment getAppointmentByAptId(int aptId);
	
	public List<Appointment> getAppointments();
	
	public Appointment saveAppointment(Appointment apt);
	
	public Appointment deleteAppointment(int aptId);
	
	public List<String> getAvailableTimeSlots(String physicianEmail,LocalDate aptDate);
	
	public int getEmployeeId(String physicianEmail);

	public List<Map<String, String>> getCalendarAppointments();
}
