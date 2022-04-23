package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Allergy;

@Repository
public interface AllergyRepository extends CrudRepository<Allergy, Integer> {

}