package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Medication;

@Repository
public interface MedicationRepository extends CrudRepository<Medication, Integer> {

}
