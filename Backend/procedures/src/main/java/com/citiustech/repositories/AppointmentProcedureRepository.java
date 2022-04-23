package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.AppointmentProcedure;

@Repository
public interface AppointmentProcedureRepository extends CrudRepository<AppointmentProcedure, String> {
}