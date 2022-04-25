package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentMedications;

@Repository
public interface AppointmentMedicationsRepository extends CrudRepository<AppointmentMedications, Integer> {

}
