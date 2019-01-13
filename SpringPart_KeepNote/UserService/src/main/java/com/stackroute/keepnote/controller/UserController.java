package com.stackroute.keepnote.controller;

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

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/user")
@Api
@CrossOrigin("*")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/user" using HTTP POST method
	 */
	@PostMapping
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		ResponseEntity<User> result = null;
		try {
			User userCreated = userService.registerUser(user);
			result = new ResponseEntity<User>(userCreated, HttpStatus.CREATED);

		} catch (UserAlreadyExistsException e) {
			result = new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
		return result;
	}

	/*
	 * Define a handler method which will update a specific user by reading the
	 * Serialized object from request body and save the updated user details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the user updated successfully.
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP PUT
	 * method.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable String id) {
		ResponseEntity<User> result = null;
		User updatedUser;
		try {
			updatedUser = userService.updateUser(id, user);
			if (updatedUser != null) {
				result = new ResponseEntity<User>(updatedUser, HttpStatus.OK);
			}
		} catch (UserNotFoundException e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

	/*
	 * Define a handler method which will delete a user from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the user deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP
	 * Delete method" where "id" should be replaced by a valid userId without {}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteUser(@PathVariable String id) {
		ResponseEntity<Boolean> result = null;
		boolean userDeleted;
		try {
			userDeleted = userService.deleteUser(id);
			if (userDeleted) {
				result = new ResponseEntity<Boolean>(userDeleted, HttpStatus.OK);
			}
		} catch (UserNotFoundException e) {
			// TODO Auto-generated catch block
			result = new ResponseEntity<Boolean>(HttpStatus.NOT_FOUND);
		}
		return result;
	}

	/*
	 * Define a handler method which will show details of a specific user. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the user found successfully. 2. 404(NOT
	 * FOUND) - If the user with specified userId is not found. This handler method
	 * should map to the URL "/api/v1/user/{id}" using HTTP GET method where "id"
	 * should be replaced by a valid userId without {}
	 */
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable String id) {
		ResponseEntity<User> result = null;
		try {
			User user = userService.getUserById(id);
			if (user != null) {
				result = new ResponseEntity<User>(user, HttpStatus.OK);
			}
		} catch (UserNotFoundException e) {
			result = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return result;
	}

}
