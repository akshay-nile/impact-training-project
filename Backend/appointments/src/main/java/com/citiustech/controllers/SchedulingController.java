package com.citiustech.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.models.Window;
import com.citiustech.services.SchedulingService;

@RestController
@RequestMapping("/appointments/api")
public class SchedulingController {

	@Autowired
	private SchedulingService schedulingService;

	@PostMapping("/get-windows")
	public ResponseEntity<?> getAvailabilityWindows(@RequestBody Map<String, String> map) {
		LocalDate date = LocalDate.parse(map.get("date"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		String patientId = map.get("patientId");
		String employeeId = map.get("employeeId");
		int skip = map.containsKey("skip") ? Integer.parseInt(map.get("skip")) : -1;

		List<Window> windows = schedulingService.getAvailabilityWindows(date, patientId, employeeId, skip);
		return new ResponseEntity<>(windows, HttpStatus.OK);
	}
}
