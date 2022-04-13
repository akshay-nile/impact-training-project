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
		LocalDate aptDate = LocalDate.parse(map.get("aptDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		String patientEmail = map.get("patientEmail");
		String physician = map.get("physician");
		
		List<Window> windows = schedulingService.getAvailabilityWindows(aptDate, patientEmail, physician);
		return new ResponseEntity<>(windows, HttpStatus.OK);
	}
}
