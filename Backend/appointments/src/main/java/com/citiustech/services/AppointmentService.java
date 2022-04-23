package com.citiustech.services;

import java.util.List;
import java.util.Map;

import com.citiustech.models.Appointment;

public interface AppointmentService {

	public List<Appointment> getAppointments();

	public Appointment getAppointmentById(int appointmentId);
	
	public Appointment addAppointment(Appointment appointment);
	
	public Appointment updateAppointment(Appointment appointment);
	
	public List<Map<String, String>> getCalendarAppointments();

	public List<Appointment> getUpcomingAppointments(String patientId);

	public List<Map<String, String>> getCalendarAppointmentsByPatientId(String patientId);
	
	public List<Map<String, String>> getCalendarAppointmentsByEmployeeId(String EmployeeId);

	public int getEmployeeId(String physicianEmail);

	public List<String> getAppointmentsMeetingTitles(String patientId);

	public List<Appointment> geAppointmentsByPatientId(String patientId);

	public List<Appointment> getAppointmentsByEmployeeId(String employeeId);

	public List<Appointment> getAllPastAppointments();

	public List<Appointment> getPastAppointmentsByPatientId(String id);

	public List<Appointment> getPastAppointmentsByEmployeeId(String id);

}
