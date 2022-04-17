package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Medication;

@Repository
public interface MedicationRepository extends CrudRepository<Medication, Integer> {

	@Query("SELECT m FROM Medication m,AppointmentMedication am WHERE am.aptId=?1 AND m.medicationId=am.medicationId")
	List<Medication> getMedicationByAptId(int aptId);
}
