package com.citiustech.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Appointment;
import com.citiustech.models.TimeSlot;
import com.citiustech.models.Window;
import com.citiustech.models.constants.Status;
import com.citiustech.repositories.AppointmentRepository;

@Service
public class SchedulingServiceImpl implements SchedulingService {

	@Autowired
	private AppointmentRepository appointmentRepo;

	private List<TimeSlot> getBusyTimeSlots(LocalDate date, String id, int skip) {
		List<Appointment> appointments = null;
		if (id.startsWith("E")) {
			appointments = appointmentRepo.findByDateAndEmployeeIdOrderByDateDesc(date, id);
		} else if (id.startsWith("P")) {
			appointments = appointmentRepo.findByDateAndPatientIdOrderByDateDesc(date, id);
		} else {
			return null;
		}
		return appointments.stream()
				.filter(a -> a.getAppointmentId() != skip
						&& (a.getStatus().equals(Status.ACCEPTED) || a.getStatus().equals(Status.PENDING)))
				.map(Appointment::getTime).map(TimeSlot::fromString).collect(Collectors.toList());
	}

	private List<TimeSlot> getFreeTimeSlots(LocalDate date, String patientId, String employeeId, int skip) {
		List<TimeSlot> doctorBusySlots = getBusyTimeSlots(date, employeeId, skip);
		List<TimeSlot> patientBusySlots = getBusyTimeSlots(date, patientId, skip);
		List<TimeSlot> dayLine = TimeSlot.getDayLine(30, date.equals(LocalDate.now()));
		if (doctorBusySlots != null && patientBusySlots != null) {
			for (int i = 0; i < dayLine.size(); i++) {
				TimeSlot timeSlot = dayLine.get(i);
				if (timeSlot.overlapsAny(doctorBusySlots) || timeSlot.overlapsAny(patientBusySlots)) {
					dayLine.set(i, null);
				}
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

	public List<Window> getAvailabilityWindows(LocalDate date, String patientId, String employeeId, int skip) {
		if (date.getDayOfWeek().equals(DayOfWeek.SUNDAY) || date.isBefore(LocalDate.now())) {
			return List.of();
		}

		List<TimeSlot> freeSlots = getFreeTimeSlots(date, patientId, employeeId, skip);
		List<Window> windows = new ArrayList<>();
		Window window = null;

		for (TimeSlot t : freeSlots) {
			if (t == null && window != null) {
				windows.add(closeWindow(window));
				window = null;
			} else if (t != null && window == null) {
				window = new Window();
			}

			if (window != null) {
				window.getStartTimes().add(t.startsAt.format(TimeSlot.timeFormat));
				window.getEndTimes().add(t.endsAt.format(TimeSlot.timeFormat));
			}
		}

		if (window != null) {
			windows.add(closeWindow(window));
		}
		return windows;
	}

}
