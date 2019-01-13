package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserAuthenticationService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/auth")
@Api
@CrossOrigin("*")
public class UserAuthenticationController {
	static final long EXPIRATIONTIME = 3000000;
	Map<String, String> map = new HashMap<>();

	private UserAuthenticationService authenticationService;

	public UserAuthenticationController(UserAuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP
	 * POST method
	 */
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		ResponseEntity<User> result = null;
		try {
			authenticationService.saveUser(user);
			result = new ResponseEntity<User>(HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			result = new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
		return result;
	}

	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the username and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is not
	 * successful. If credentials are validated successfully, then JWT token will be
	 * generated. The token should be returned back to the caller along with the API
	 * response. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If login is successful 2.
	 * 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		String jwtToken = "";

		try {
			jwtToken = getToken(user.getUserId(), user.getUserPassword());
			map.clear();
			map.put("message", "user successfully logged in");
			map.put("token", jwtToken);
		} catch (Exception e) {
			String exceptionMessage = e.getMessage();
			map.clear();
			map.put("message", exceptionMessage);
			map.put("token", null);
			return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	// Generate JWT token
	public String getToken(String username, String password) throws Exception {

		if (username == null || password == null) {
			throw new ServletException("Please fill in username and password");
		}

		User user = authenticationService.findByUserIdAndPassword(username, password);

		if (user == null) {
			throw new ServletException("Invalid credentials.");
		}

		String jwtToken = Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();

		return jwtToken;

	}

}
