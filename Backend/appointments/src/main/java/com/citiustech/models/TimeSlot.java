package com.citiustech.models;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class TimeSlot {

	public static final transient DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("hh:mm a");

	public LocalTime startsAt;
	public LocalTime endsAt;

	public boolean overlaps(TimeSlot other) {
		if (this.startsAt.isBefore(other.startsAt)) {
			return this.endsAt.isAfter(other.startsAt);
		} 
		return this.startsAt.isBefore(other.endsAt);
	}

	public static TimeSlot from(String str) {
		String[] times = str.split("to");
		TimeSlot slot = new TimeSlot();
		slot.startsAt = LocalTime.parse(times[0].trim().toLowerCase(), timeFormat);
		slot.endsAt = LocalTime.parse(times[1].trim().toLowerCase(), timeFormat);
		return slot;
	}
	
	public static List<TimeSlot> getDayLine(long intervalInMinutes) {
		LocalTime hospitalOpen = LocalTime.parse("09:00 am", timeFormat);
		LocalTime hospitalClose = LocalTime.parse("06:00 pm", timeFormat);
		List<TimeSlot> list = new ArrayList<>();
		for(LocalTime t = hospitalOpen; t.isBefore(hospitalClose); ) {
			TimeSlot slot = new TimeSlot();
			slot.startsAt = t;
			slot.endsAt = (t = t.plusMinutes(intervalInMinutes));
			list.add(slot);
		}
		return list;
	}

	public boolean overlapsAny(List<TimeSlot> timeSlots) {		
		return timeSlots.stream().anyMatch(this::overlaps);
	}
	
	@Override
	public String toString() {
		return "(" + startsAt.format(timeFormat) + " to " + endsAt.format(timeFormat) + ")";
	}

}
