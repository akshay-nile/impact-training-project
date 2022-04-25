package com.citiustech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.models.Procedure;

@Repository
public interface ProcedureRepository extends CrudRepository<Procedure, Integer> {

}
