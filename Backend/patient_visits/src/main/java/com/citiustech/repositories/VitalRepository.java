package com.citiustech.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Vital;

@Repository
public interface VitalRepository extends CrudRepository<Vital, Integer> {
	
	@Query("SELECT v FROM Vital v WHERE v.aptId = ?1")
	public Vital getVitalDetailsByPatientId(int aptId);
	
}
