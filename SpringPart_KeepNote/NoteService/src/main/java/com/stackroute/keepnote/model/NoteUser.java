package com.stackroute.keepnote.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class NoteUser {

	@Id
	private String userId;
	private List<Note> notes;

	public NoteUser() {

	}

	public NoteUser(String userId, List<Note> notes) {
		this.userId = userId;
		this.notes = notes;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<Note> getNotes() {
		return notes;
	}

	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}
}
