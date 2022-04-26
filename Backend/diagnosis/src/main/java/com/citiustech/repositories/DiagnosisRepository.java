package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Diagnosis;

@Repository
public interface DiagnosisRepository extends CrudRepository<Diagnosis, Integer> {

}
