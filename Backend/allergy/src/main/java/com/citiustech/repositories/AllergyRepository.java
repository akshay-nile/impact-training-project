package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Allergy;

@Repository
public interface AllergyRepository extends CrudRepository<Allergy, Integer> {

}