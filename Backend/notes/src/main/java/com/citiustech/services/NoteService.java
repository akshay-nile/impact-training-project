package com.citiustech.services;

import java.util.List;

import com.citiustech.models.Note;

public interface NoteService {

	public Note addNote(Note note);
	
	public List<Note> getAllNotes();

	public Note getNoteById(int id);

	public Note updateNote(Note note);
	
}
