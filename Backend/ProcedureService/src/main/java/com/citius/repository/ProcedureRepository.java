package com.citius.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.citius.model.Procedure;

@Repository
public interface ProcedureRepository extends CrudRepository<Procedure, Integer> {}
