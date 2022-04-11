package com.citius.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citius.model.Diagnosis;

@Repository
public interface DiagnosisRepository extends CrudRepository<Diagnosis, Integer> {
	
		
}
