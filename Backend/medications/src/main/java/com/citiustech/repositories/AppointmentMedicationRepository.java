package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentMedication;

@Repository
public interface AppointmentMedicationRepository extends CrudRepository<AppointmentMedication, String>{
}
