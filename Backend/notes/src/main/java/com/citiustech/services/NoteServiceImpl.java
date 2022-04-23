package com.citiustech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.models.Note;
import com.citiustech.repositories.NoteRepository;
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
		return noteRepo.findById(id).get();
	}

	@Override
	public Note updateNote(Note note) {
		return noteRepo.save(note);
	}
}
