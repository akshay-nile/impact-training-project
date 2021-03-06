package com.citiustech.models;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

public class TimeSlot {

	public static final DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH);

	public LocalTime startsAt;
	public LocalTime endsAt;

	public boolean overlaps(TimeSlot other) {
		if (this.startsAt.isBefore(other.startsAt)) {
			return this.endsAt.isAfter(other.startsAt);
		}
		return this.startsAt.isBefore(other.endsAt);
	}

	public static List<TimeSlot> getDayLine(long intervalInMinutes, boolean isTodaysAppt) {
		LocalTime hospitalOpen = LocalTime.parse("09:00 AM", timeFormat);
		LocalTime hospitalClose = LocalTime.parse("06:00 PM", timeFormat);
		if (isTodaysAppt) {
			LocalTime now = LocalTime.now();
			hospitalOpen = now.minusMinutes(now.getMinute() % 30).plusMinutes(30);
		}

		List<TimeSlot> list = new ArrayList<>();
		for (LocalTime t = hospitalOpen; t.isBefore(hospitalClose);) {
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

	public static TimeSlot fromString(String str) {
		String[] times = str.split("to");
		TimeSlot slot = new TimeSlot();
		slot.startsAt = LocalTime.parse(times[0].trim().toUpperCase(), timeFormat);
		slot.endsAt = LocalTime.parse(times[1].trim().toUpperCase(), timeFormat);
		return slot;
	}

	@Override
	public String toString() {
		return startsAt.format(timeFormat) + " to " + endsAt.format(timeFormat);
	}

//	public static void main(String[] args) {
//		var t1 = fromString("11:30 AM to 12:00 PM");
//		var t2 = fromString("12:00 PM to 01:00 PM");
//		System.out.println(t1.overlapsAny(Arrays.asList(t2)));
//	}

}
