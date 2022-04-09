package com.citiustech.repository;

import org.springframework.data.repository.CrudRepository;

import com.citiustech.model.Note;

public interface NoteRepository extends CrudRepository<Note,Integer>{

}
