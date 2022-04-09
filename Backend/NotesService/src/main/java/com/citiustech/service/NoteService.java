package com.citiustech.service;

import java.util.List;

import com.citiustech.model.Note;

public interface NoteService {

	public Note addNote(Note note);
	
	public List<Note> getAllNotes();

	public Note getNoteById(int id);
	
}
