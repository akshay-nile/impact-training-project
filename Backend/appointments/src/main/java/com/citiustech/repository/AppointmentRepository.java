package com.citiustech.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.model.Appointment;
@Repository

public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
	
	@Query("SELECT a.time FROM Appointment a WHERE a.physician=?1 AND aptDate=?2")
	public List<String> getAvailableTimeSlots(String physicianEmail,LocalDate aptDate);
	
	@Query("SELECT a.empId FROM Appointment a WHERE a.physician=?1")
	public int getEmployeeId(String physicianEmail);

	public List<Appointment> findByOrderByAptDate();
	
}
