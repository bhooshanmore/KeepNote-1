package com.stackroute.keepnote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.service.NoteService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/note")
@Api
@CrossOrigin("*")
public class NoteController {

	private NoteService noteService;

	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}

	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the note created
	 * successfully. 2. 409(CONFLICT) - If the noteId conflicts with any existing
	 * user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST
	 * method
	 */
	@PostMapping
	public ResponseEntity<Note> createNote(@RequestBody Note note) {
		ResponseEntity<Note> result = null;
		if (noteService.createNote(note)) {
			result = new ResponseEntity<Note>(HttpStatus.CREATED);
		} else {
			result = new ResponseEntity<Note>(HttpStatus.CONFLICT);
		}
		return result;
	}

	/*
	 * Define a handler method which will delete a note from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid noteId without {}
	 */
	@DeleteMapping("/{userId}/{noteId}")
	public ResponseEntity<Boolean> deleteNote(@PathVariable String userId, @PathVariable int noteId) {
		ResponseEntity<Boolean> result = null;

		if (noteService.deleteNote(userId, noteId)) {
			result = new ResponseEntity<Boolean>(true, HttpStatus.OK);
		} else {
			result = new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<Boolean> deleteAllNotes(@PathVariable String userId) {
		ResponseEntity<Boolean> result = null;
		try {
			noteService.deleteAllNotes(userId);
			result = new ResponseEntity<Boolean>(true, HttpStatus.OK);
		} catch (NoteNotFoundExeption e) {
			result = new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the note updated successfully.
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{id}" using HTTP PUT
	 * method.
	 */
	@PutMapping("/{userId}/{noteId}")
	public ResponseEntity<Note> updateNote(@RequestBody Note note, @PathVariable int noteId,
			@PathVariable String userId) {
		ResponseEntity<Note> result = null;
		try {
			Note noteRes = noteService.updateNote(note, noteId, userId);
			result = new ResponseEntity<Note>(noteRes, HttpStatus.OK);
		} catch (NoteNotFoundExeption e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		return result;
	}

	/*
	 * Define a handler method which will get us the all notes by a userId. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note found successfully.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP GET
	 * method
	 */
	@GetMapping("/{userId}")
	public ResponseEntity<List<Note>> getAllNoteByUserId(@PathVariable String userId) {

		return new ResponseEntity<List<Note>>(noteService.getAllNoteByUserId(userId),HttpStatus.OK);

		

	}

	/*
	 * Define a handler method which will show details of a specific note created by
	 * specific user. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the note found
	 * successfully. 2. 404(NOT FOUND) - If the note with specified noteId is not
	 * found. This handler method should map to the URL
	 * "/api/v1/note/{userId}/{noteId}" using HTTP GET method where "id" should be
	 * replaced by a valid reminderId without {}
	 * 
	 */
	@GetMapping("/{userId}/{noteId}")
	public ResponseEntity<Note> getNoteByNoteId(@PathVariable String userId, @PathVariable int noteId) {
		ResponseEntity<Note> result = null;
		try {
			
			result = new ResponseEntity<Note>(noteService.getNoteByNoteId(userId, noteId),HttpStatus.OK);
		} catch (NoteNotFoundExeption e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		return result;

	}
	
	@PutMapping("/{userId}/usernote")
	public ResponseEntity<NoteUser> updateUserNote(@RequestBody NoteUser noteuser, 
			@PathVariable String userId) {
		
			 return new ResponseEntity<NoteUser>(noteService.updateUserNote(noteuser, userId), HttpStatus.OK);
		
		
	}

}
