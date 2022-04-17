package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

	public Patient findByEmail(String email);

	public Patient findByEmailAndPassword(String email, int password);

	@Query("SELECT p FROM Patient p WHERE p.phone LIKE %:phone")
	public Patient findByPhone(String phone);

	@Query("SELECT p FROM Patient p")
	public List<Patient> getPatientNames();

	@Query("SELECT p.id FROM Patient p WHERE p.email=?1")
	public int getPatientIdByEmail(String email);

	@Query("SELECT p FROM Patient p WHERE p.patientId=?1")
	public Patient getPatientById(int id);

}
