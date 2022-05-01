package utils;

import java.io.File;
import java.io.IOException;

import com.citiustech.models.Employee;
import com.citiustech.models.Patient;
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

}
