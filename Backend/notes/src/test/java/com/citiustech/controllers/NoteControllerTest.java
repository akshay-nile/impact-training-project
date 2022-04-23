package com.citiustech.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.citiustech.models.Note;
import com.citiustech.services.NoteService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class NoteControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Mock
	private NoteService noteService;

	@InjectMocks
	private NoteController noteController;

	private Note note;

	@BeforeEach
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(noteController).build();
		note = new Note();
	}

	@AfterEach
	public void tearDown() {
		note = null;
	}

	@Test
	@DisplayName("Test Method to get note Details By note Id")
	public void testMethodToGetNoteDetailsByNoteId() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/notes/api/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to get all notes")
	public void testMethodToGetAllNoteDetails() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/notes/api/getAllNotes").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to save note Details")
	public void testMethodToSaveNoteDetails() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/notes/api/addNote").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(note))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	@Test
	@DisplayName("Test Method to update note Details")
	public void testMethodToUpdateNoteDetails() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.put("/notes/api/updateNote").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(note))).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	}

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
