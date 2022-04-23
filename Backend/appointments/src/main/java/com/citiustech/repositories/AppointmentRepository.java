package com.citiustech.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Appointment;

@Repository

public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {

	public List<Appointment> findByOrderByDateDesc();

	public List<Appointment> findByPatientIdOrderByDateDesc(String patientId);

	public List<Appointment> findByEmployeeIdOrderByDateDesc(String employeeId);

	public List<Appointment> findByDateAndEmployeeIdOrderByDateDesc(LocalDate date, String employeeId);

	public List<Appointment> findByDateAndPatientIdOrderByDateDesc(LocalDate date, String patientId);

	public boolean existsByPatientIdAndEmployeeIdAndDateAndTime(String patientId, String employeeId, LocalDate date,
			String time);

	public List<Appointment> findByPatientIdAndIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(String patientId,
			boolean isDataCollectionAppt, boolean dataCollectionStatus);

	@Query("SELECT a.editedBy FROM Appointment a WHERE a.employeeId=?1")
	public int getEmployeeId(String employeeId);

	@Query("SELECT a.title FROM Appointment a WHERE a.patientId=?1 AND a.dataCollectionStatus=?2 AND a.isDataCollectionAppt=?3")
	public List<String> getAppointmentsMeetingTitles(String patientId, boolean dataCollectionStatus,
			boolean isDataCollectionAppt);

	public List<Appointment> findByIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(boolean b, boolean c);

	public List<Appointment> findByEmployeeIdAndIsDataCollectionApptAndDataCollectionStatusOrderByDateDesc(
			String employeeId, boolean dataCollectionStatus, boolean isDataCollectionAppt);

}
