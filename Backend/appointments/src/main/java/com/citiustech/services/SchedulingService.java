package com.citiustech.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Appointment;
import com.citiustech.models.TimeSlot;
import com.citiustech.models.Window;
import com.citiustech.repositories.AppointmentRepository;

@Service
public class SchedulingService {

	@Autowired
	private AppointmentRepository apptRepo;
	
	private List<TimeSlot> getTimeSlots(LocalDate aptDate, String email, boolean isDoctor) {
		List<Appointment> appts = isDoctor ? apptRepo.findByAptDateAndPhysician(aptDate, email) : apptRepo.findByAptDateAndPatientEmail(aptDate, email);
		return appts.stream().map(Appointment::getTime).map(TimeSlot::from).collect(Collectors.toList());
	}

	private List<TimeSlot> getFreeSlots(List<TimeSlot> doctorSlots, List<TimeSlot> patientSlots) {
		List<TimeSlot> dayLine = TimeSlot.getDayLine(30);
		for(int i = 0; i < dayLine.size(); i++) {
			TimeSlot timeSlot = dayLine.get(i);
			if(timeSlot.overlapsAny(doctorSlots) || timeSlot.overlapsAny(patientSlots)) {
				dayLine.set(i, null);
			}
		}
		return dayLine;
	}
	
	private Window closeWindow(Window window) {
		String open = window.getStartTimes().get(0).toUpperCase();  
		String close = window.getEndTimes().get(window.getEndTimes().size() - 1);
		window.setLabel(open + " to " + close.toUpperCase());
		return window;
	}

	public List<Window> getAvailabilityWindows(LocalDate aptDate, String patientEmail, String physician) {
		List<TimeSlot> doctorSlots = getTimeSlots(aptDate, physician, true);
		List<TimeSlot> patientSlots = getTimeSlots(aptDate, patientEmail, false);
		List<TimeSlot> freeSlots = getFreeSlots(doctorSlots, patientSlots);
		
		List<Window> windows = new ArrayList<>();
		Window window = null;
		
		for(TimeSlot t : freeSlots) {
			if(t == null && window != null) {
				windows.add(closeWindow(window));
				window = null;
			} else if (t != null && window == null) {
				window = new Window();
			}
			
			if(window != null) {
				window.getStartTimes().add(t.startsAt.format(TimeSlot.timeFormat));
				window.getEndTimes().add(t.endsAt.format(TimeSlot.timeFormat));
			}
		}
		
		if(window != null) {
			windows.add(closeWindow(window));
		}
		return windows;
	}


}
