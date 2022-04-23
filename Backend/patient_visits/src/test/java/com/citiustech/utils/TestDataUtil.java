package com.citiustech.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.citiustech.models.Appointment;
import com.citiustech.models.Employee;
import com.citiustech.models.Medication;
import com.citiustech.models.Patient;
import com.citiustech.models.Procedure;
import com.citiustech.models.Vital;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TestDataUtil {

	public Patient getPatient() throws StreamReadException, DatabindException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		File file = new File(".\\src\\test\\resources\\data\\Patient.json");
		return objectMapper.readValue(file, Patient.class);

	}

	public Employee getEmployee() throws StreamReadException, DatabindException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		File file = new File(".\\src\\test\\resources\\data\\Employee.json");
		return objectMapper.readValue(file, Employee.class);

	}

	public Appointment getAppointment() throws StreamReadException, DatabindException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		File file = new File(".\\src\\test\\resources\\data\\Appointment.json");
		return objectMapper.readValue(file, Appointment.class);

	}

}
