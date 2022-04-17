package com.citiustech.services;

import java.time.LocalDate;
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
	
	private List<TimeSlot> getTimeSlots(LocalDate aptDate, String email, int skip, boolean isDoctor) {
		List<Appointment> appts = isDoctor ? apptRepo.findByAptDateAndPhysician(aptDate, email) : apptRepo.findByAptDateAndPatientEmail(aptDate, email);
		return appts.stream().filter(a -> a.getAptId() != skip).map(Appointment::getTime).map(TimeSlot::from).collect(Collectors.toList());
	}

	private List<TimeSlot> getFreeSlots(LocalDate aptDate, String physician, String patientEmail, int skip) {
		List<TimeSlot> doctorSlots = getTimeSlots(aptDate, physician, skip, true);
		List<TimeSlot> patientSlots = getTimeSlots(aptDate, patientEmail, skip, false);
		List<TimeSlot> dayLine = TimeSlot.getDayLine(30, aptDate.equals(LocalDate.now()));
		for(int i = 0; i < dayLine.size(); i++) {
			if(dayLine.get(i).overlapsAny(doctorSlots) || dayLine.get(i).overlapsAny(patientSlots)) {
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

	public List<Window> getAvailabilityWindows(LocalDate aptDate, String patientEmail, String physician, int skip) {
		if(aptDate.isBefore(LocalDate.now())) {
			return List.of();
		} 
		
		List<TimeSlot> freeSlots = getFreeSlots(aptDate, physician, patientEmail, skip);
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
