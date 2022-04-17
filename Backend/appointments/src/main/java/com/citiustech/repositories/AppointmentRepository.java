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
	public List<String> getAvailableTimeSlots(String physicianEmail, LocalDate aptDate);

	@Query("SELECT a.empId FROM Appointment a WHERE a.physician=?1")
	public int getEmployeeId(String physicianEmail);

	public List<Appointment> findByAptDateAndPhysician(LocalDate aptDate, String physician);

	public List<Appointment> findByAptDateAndPatientEmail(LocalDate aptDate, String patientEmail);

	public List<Appointment> findByOrderByAptDate();

	public List<Appointment> findByPatientEmailAndIsDataCollectionApptAndDataStatus(String patientEmail,
			boolean isDataCollectionAppt, boolean dataStatus);

	public List<Appointment> findByPatientEmail(String email);

	@Query("SELECT a.meetingTitle FROM Appointment a WHERE a.patientEmail=?1 AND a.dataStatus=?2 AND a.isDataCollectionAppt=?3")
	public List<String> getAppointmentsMeetingTitle(String patientEmail, boolean dataStatus, boolean isDataCollectionAppt);

}
