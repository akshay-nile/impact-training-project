package com.citiustech.hospital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.hospital.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
	public Patient findByEmail(String email);
	
	public Patient findByEmailAndPassword(String email, int password);
}
