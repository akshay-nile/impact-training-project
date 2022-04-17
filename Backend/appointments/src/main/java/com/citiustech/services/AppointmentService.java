package com.citiustech.services;

import java.util.List;
import java.util.Map;

import com.citiustech.models.Appointment;

public interface AppointmentService {

	public Appointment getAppointmentByAptId(int aptId);
	
	public List<Appointment> getAppointments();
	
	public Appointment addAppointment(Appointment apt);
	
	public Appointment deleteAppointment(int aptId);
	
	public int getEmployeeId(String physicianEmail);

	public List<Map<String, String>> getCalendarAppointments();

	public List<Appointment> getpastAppointments(String patientEmail);

	public List<Appointment> upcomingAppointments(String patientEmail);

	public List<Map<String, String>> getCalendarAppointmentsByPatientEmail(String email);

	public List<String> getAppointmentsMeetingTitle(String patientEmail);
}
