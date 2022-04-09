package com.citiustech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Note;
import com.citiustech.repository.NoteRepository;
@Service
public class NoteServiceImpl implements NoteService {

	@Autowired
	private NoteRepository noteRepo;

	@Override
	public Note addNote(Note note) {
		return noteRepo.save(note);
	}

	@Override
	public List<Note> getAllNotes() {
		return (List<Note>) noteRepo.findAll();
	}

	@Override
	public Note getNoteById(int id) {
		// TODO Auto-generated method stub
		return noteRepo.findById(id).get();
	}

}
