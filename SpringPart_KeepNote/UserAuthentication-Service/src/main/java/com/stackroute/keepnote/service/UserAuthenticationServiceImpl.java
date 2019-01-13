package com.stackroute.keepnote.service;

import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserAutheticationRepository;

@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

	private UserAutheticationRepository authenticationRepo;

	public UserAuthenticationServiceImpl(UserAutheticationRepository authenticationRepo) {
		this.authenticationRepo = authenticationRepo;
	}

	/*
	 * This method should be used to validate a user using userId and password. Call
	 * the corresponding method of Respository interface.
	 * 
	 */
	@Override
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		User user = authenticationRepo.findByUserIdAndUserPassword(userId, password);
		if (user == null) {
			throw new UserNotFoundException("Not found");
		}
		return user;
	}

	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */

	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		boolean save = false;
		User userRes = authenticationRepo.findById(user.getUserId()).orElse(null);
		if (userRes == null) {
			authenticationRepo.save(user);
			save = true;
		} else {
			throw new UserAlreadyExistsException("Cannot Register User");
		}
		return save;
	}
}
