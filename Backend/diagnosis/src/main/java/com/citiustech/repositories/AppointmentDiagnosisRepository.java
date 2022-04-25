package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentDiagnosis;

@Repository
public interface AppointmentDiagnosisRepository extends CrudRepository<AppointmentDiagnosis, Integer> {

}
