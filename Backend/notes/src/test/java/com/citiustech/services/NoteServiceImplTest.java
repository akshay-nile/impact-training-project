package com.citiustech.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.citiustech.models.Note;
import com.citiustech.repositories.NoteRepository;

@ExtendWith(MockitoExtension.class)
class NoteServiceImplTest {
	@Mock
	private NoteRepository noteRepo;

	@InjectMocks
	private NoteServiceImpl noteServiceImpl;

	private Note note;
	private List<Note> noteList;

	@BeforeEach
	public void setUp() {
		noteList = new ArrayList<>();
		note = new Note();
		note.setNoteId(1);
		note.setEmployeeId("E0001");
		note.setMessage("General Note");
		note.setSendTo("Tom Willims");
		note.setUrgencyLevel("Urgent");
		noteList.add(note);
	}

	@AfterEach
	public void tearDown() {
		note = null;

	}

	@Test
	@DisplayName("Test Method to get note details By note Id")
	public void testMethodToGetNoteDetailsByNoteId() {
		when(noteRepo.findById(1)).thenReturn(Optional.of(note));
		assertNotNull(noteServiceImpl.getNoteById(1).getMessage());
		assertNotNull(noteServiceImpl.getNoteById(1).getEmployeeId());
		assertNotNull(noteServiceImpl.getNoteById(1).getNoteId());
		assertNotNull(noteServiceImpl.getNoteById(1).getUrgencyLevel());
	}

	@Test
	@DisplayName("Test Method to get all notes")
	public void testMethodToGetAllNoteDetails() {
		when(noteRepo.findAll()).thenReturn(noteList);
		assertNotNull(noteServiceImpl.getAllNotes().get(0).getMessage());
	}

	@Test
	@DisplayName("Test Method to save note Details")
	public void testMethodToSaveNoteDetails() {
		when(noteRepo.save(any())).thenReturn(note);
		assertNotNull(noteServiceImpl.addNote(note).getMessage());
	}

	@Test
	@DisplayName("Test Method to update note Details")
	public void testMethodToGetVitalDetails() {
		when(noteRepo.save(any())).thenReturn(note);
		assertNotNull(noteServiceImpl.updateNote(note).getMessage());
	}
}
