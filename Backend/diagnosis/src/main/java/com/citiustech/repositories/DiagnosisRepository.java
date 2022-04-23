package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Diagnosis;

@Repository
public interface DiagnosisRepository extends CrudRepository<Diagnosis, Integer> {

	@Query("SELECT d FROM Diagnosis d,AppointmentDiagnosis ad WHERE ad.aptId=?1 AND d.diagnosisId=ad.diagnosisId")
	List<Diagnosis> getDiagnosisByAptId(int aptId);
	
}
