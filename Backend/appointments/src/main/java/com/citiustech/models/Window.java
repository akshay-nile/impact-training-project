package com.citiustech.models;

import java.util.ArrayList;
import java.util.List;

public class Window {
	
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
