package com.citiustech.models;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Window {

	public static final transient DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("hh:mm a");

	private String label;
	private List<String> startTimes;
	private List<String> endTimes;

	public Window() {
		this.startTimes = new ArrayList<>();
		this.endTimes = new ArrayList<>();
	}

	public List<String> getStartTimes() {
		return startTimes;
	}

	public List<String> getEndTimes() {
		return endTimes;
	}

	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
}
