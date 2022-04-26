package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentProcedures;

@Repository
public interface AppointmentProceduresRepository extends CrudRepository<AppointmentProcedures, Integer> {

}