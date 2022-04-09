package com.citiustech.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Appointment;
import com.citiustech.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepo;

	@Override
	public Appointment getAppointmentByAptId(int aptId) {
		return appointmentRepo.findById(aptId).get();
	}

	@Override
	public List<Appointment> getAppointments() {
		return (List<Appointment>) appointmentRepo.findByOrderByAptDate();
	}

	@Override
	public Appointment saveAppointment(Appointment apt) {
		// TODO Auto-generated method stub
		return appointmentRepo.save(apt);
	}

	@Override
	public Appointment deleteAppointment(int aptId) {
		Appointment appintment = appointmentRepo.findById(aptId).orElse(null);
		if (appintment != null) {
			appointmentRepo.deleteById(aptId);

		}
		return appintment;
	}

	@Override
	public List<String> getAvailableTimeSlots(String physicianEmail, LocalDate aptDate) {
		List<String> timeSlots = new ArrayList<String>(Arrays.asList("9-11", "11-1", "2-4", "4-6"));
		List<String> aptList = appointmentRepo.getAvailableTimeSlots(physicianEmail, aptDate);
		timeSlots.removeAll(aptList);
		return timeSlots;
	}

	@Override
	public int getEmployeeId(String physicianEmail) {
		return appointmentRepo.getEmployeeId(physicianEmail);
	}

	@Override
	public List<Map<String, String>> getCalendarAppointments() {
		List<Appointment> appointmentList = (List<Appointment>) appointmentRepo.findAll();

		List<Map<String, String>> eventList = new ArrayList<>();
		for (Appointment apt : appointmentList) {
			Map<String, String> mapEvent = new HashMap<>();
			mapEvent.put("title", apt.getMeetingTitle());

			mapEvent.put("start", formatTimeslot(apt.getAptDate(), apt.getTime().split("-")[0]));
			mapEvent.put("end", formatTimeslot(apt.getAptDate(), apt.getTime().split("-")[1]));
			eventList.add(mapEvent);
		}

		return eventList;
	}

	private String formatTimeslot(LocalDate localDate, String string) {
		String formatTimeSlot = localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + "T%02d:00:00";
		if (string.equalsIgnoreCase("1") || string.equalsIgnoreCase("2") || string.equalsIgnoreCase("4")
				|| string.equalsIgnoreCase("6")) {
			return String.format(formatTimeSlot, Integer.parseInt(string) + 12);
		}
		return String.format(formatTimeSlot, Integer.parseInt(string));
	}

}
