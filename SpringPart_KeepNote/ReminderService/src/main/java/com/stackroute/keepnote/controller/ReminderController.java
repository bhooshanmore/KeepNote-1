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

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.service.ReminderService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/reminder")
@Api
@CrossOrigin("*")
public class ReminderController {

	private ReminderService reminderService;

	public ReminderController(ReminderService reminderService) {
		this.reminderService = reminderService;
	}

	/*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP POST
	 * method".
	 */
	@PostMapping()
	public ResponseEntity<Reminder> createReminder(@RequestBody Reminder reminder) {
		ResponseEntity<Reminder> result = null;
		try {
			Reminder reminderRes = reminderService.createReminder(reminder);
			if (reminderRes != null) {
				result = new ResponseEntity<Reminder>(reminderRes, HttpStatus.CREATED);
			}
		} catch (ReminderNotCreatedException e) {
			result = new ResponseEntity<Reminder>(HttpStatus.CONFLICT);
		}

		return result;
	}

	/*
	 * Define a handler method which will delete a reminder from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the reminder deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the reminder with specified reminderId is
	 * not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid reminderId without {}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteReminder(@PathVariable("id") String reminderId) {
		ResponseEntity<Boolean> result = null;
		try {
			boolean deleted = reminderService.deleteReminder(reminderId);
			if (deleted) {
				result = new ResponseEntity<Boolean>(deleted, HttpStatus.OK);
			}
		} catch (ReminderNotFoundException e) {

			result = new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

	/*
	 * Define a handler method which will update a specific reminder by reading the
	 * Serialized object from request body and save the updated reminder details in
	 * a database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the reminder updated
	 * successfully. 2. 404(NOT FOUND) - If the reminder with specified reminderId
	 * is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP
	 * PUT method.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<Reminder> updateReminder(@RequestBody Reminder reminder,
			@PathVariable("id") String reminderId) {
		ResponseEntity<Reminder> result = null;
		try {
			if (reminderService.updateReminder(reminder, reminderId) != null) {
				result = new ResponseEntity<Reminder>(HttpStatus.OK);
			}
		} catch (ReminderNotFoundException e) {

			result = new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

	/*
	 * Define a handler method which will show details of a specific reminder. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the reminder found successfully. 2.
	 * 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP
	 * GET method where "id" should be replaced by a valid reminderId without {}
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Reminder> getReminderById(@PathVariable String id) {
		ResponseEntity<Reminder> result = null;
		try {
			result = new ResponseEntity<Reminder>(reminderService.getReminderById(id), HttpStatus.OK);
		} catch (ReminderNotFoundException e) {
			result = new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
		}
		return result;
	}

	/*
	 * Define a handler method which will get us the all reminders. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 1. 200(OK) - If the reminder found successfully. 2. 404(NOT
	 * FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP GET
	 * method
	 */
	@GetMapping
	public ResponseEntity<List<Reminder>> getReminder() {
		ResponseEntity<List<Reminder>> result = null;
		List<Reminder> reminderList = reminderService.getAllReminders();
		if (reminderList != null) {
			result = new ResponseEntity<List<Reminder>>(reminderList, HttpStatus.OK);
		} else {
			result = new ResponseEntity<List<Reminder>>(HttpStatus.NOT_FOUND);
		}
		return result;
	}
}
