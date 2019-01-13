package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

@Service
public class NoteServiceImpl implements NoteService {

	private NoteRepository noteRepository;

	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	/*
	 * This method should be used to save a new note.
	 */
	@Transactional
	public boolean createNote(Note note) {
		Random random = new Random();
		int noteId = random.nextInt(99999);
		note.setNoteId(noteId);
		boolean created = false;
		Optional<NoteUser> noteUser = noteRepository.findById(note.getNoteCreatedBy());
		NoteUser userNotes = null;
		if (noteUser.isPresent()) {
			userNotes = noteUser.get();
			userNotes.getNotes().add(note);
			created = noteRepository.save(userNotes) != null ? true : false;
		} else {
			userNotes = new NoteUser();
			userNotes.setUserId(note.getNoteCreatedBy());
			userNotes.setNotes(Arrays.asList(note));
			created = noteRepository.insert(userNotes) != null ? true : false;
		}

		return created;
	}

	/* This method should be used to delete an existing note. */
	@Transactional
	public boolean deleteNote(String userId, int noteId) {
		boolean delete = false;
		NoteUser noteUser = null;
		try {
			noteUser = noteRepository.findById(userId).get();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		if (noteUser != null) {
			Note noteNew = noteUser.getNotes().stream().filter(note -> note.getNoteId() == noteId).findFirst()
					.orElse(null);
			noteUser.getNotes().remove(noteNew);
			noteRepository.save(noteUser);
			delete = true;
		}
		return delete;
	}

	/* This method should be used to delete all notes with specific userId. */
	@Transactional
	public boolean deleteAllNotes(String userId) {
		boolean delete = false;
		NoteUser noteUser = noteRepository.findById(userId).get();
		if (noteUser != null) {
			noteRepository.delete(noteUser);
			delete = true;
		}
		return delete;
	}

	/*
	 * This method should be used to update a existing note.
	 */
	@Transactional
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		NoteUser noteUser = null;
		if (note.getReminders() != null) {
			note.getReminders().forEach(reminder -> {
				if (reminder.getReminderId() == null) {
					reminder.setReminderId(UUID.randomUUID().toString());
				}
			});
		}
		try {
			noteUser = noteRepository.findById(userId).get();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		if (noteUser != null) {
			List<Note> notes = noteUser.getNotes();
			Note fetchedNote = notes.stream().filter(notefilter -> notefilter.getNoteId() == id).findFirst()
					.orElse(null);
			if (note != null) {
				noteUser.getNotes().remove(fetchedNote);
				noteUser.getNotes().add(note);
				noteRepository.save(noteUser);
			}
		} else {
			throw new NoteNotFoundExeption("Not found");
		}

		return note;
	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		Note note = null;
		List<Note> noteList = new ArrayList<>();
		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			if (noteUser != null) {
				noteList = noteUser.getNotes();
				note = noteList.stream().filter(noteFilter -> noteFilter.getNoteId() == noteId).findFirst()
						.orElse(null);
			}
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}
		if (note == null) {
			throw new NoteNotFoundExeption("Not found");
		}
		return note;
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		List<Note> noteList = new ArrayList<>();
		Optional<NoteUser> noteUser = noteRepository.findById(userId);
		if (noteUser != null && noteUser.isPresent()) {
			noteList = noteUser.get().getNotes();
		}

		return noteList;
	}

	@Override
	public NoteUser updateUserNote(NoteUser noteUser, String userId) {
		// TODO Auto-generated method stub
		return noteRepository.save(noteUser);
	}

}
