package com.citiustech.repositories;

import org.springframework.data.repository.CrudRepository;

import com.citiustech.models.Note;

public interface NoteRepository extends CrudRepository<Note,Integer>{

}
