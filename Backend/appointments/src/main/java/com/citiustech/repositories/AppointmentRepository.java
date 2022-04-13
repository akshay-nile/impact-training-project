package com.citiustech.repositories;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Appointment;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
	
	@Query("SELECT a.time FROM Appointment a WHERE a.physician=?1 AND aptDate=?2")
	public List<String> getAvailableTimeSlots(String physicianEmail,LocalDate aptDate);
	
	public List<Appointment> findByAptDateAndPhysician(LocalDate aptDate, String physician);
	
	public List<Appointment> findByAptDateAndPatientEmail(LocalDate aptDate, String patientEmail);
	
	@Query("SELECT a.empId FROM Appointment a WHERE a.physician=?1")
	public int getEmployeeId(String physicianEmail);

	public List<Appointment> findByOrderByAptDate();
	
}
