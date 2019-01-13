package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/*
	 * This method should be used to save a new user.Call the corresponding method
	 * of Respository interface.
	 */
	@Transactional
	public User registerUser(User user) throws UserAlreadyExistsException {
		user.setUserAddedDate(new Date());
		return Optional.ofNullable(userRepository.insert(user))
				.orElseThrow(() -> new UserAlreadyExistsException("Not created"));
	}

	/*
	 * This method should be used to update a existing user.Call the corresponding
	 * method of Respository interface.
	 */
	@Transactional
	public User updateUser(String userId, User user) throws UserNotFoundException {
		User updateUser = null;
		User userObj = userRepository.findById(userId).get();
		if (userObj != null) {
			userRepository.save(user);
			updateUser = user;
		} else {
			throw new UserNotFoundException("Not found");
		}
		return updateUser;
	}

	/*
	 * This method should be used to delete an existing user. Call the corresponding
	 * method of Respository interface.
	 */

	public boolean deleteUser(String userId) throws UserNotFoundException {
		boolean delete = false;
		User user = userRepository.findById(userId).get();
		if (user != null) {
			userRepository.delete(user);
			delete = true;
		} else {
			throw new UserNotFoundException("Not found");
		}
		return delete;
	}

	/*
	 * This method should be used to get a user by userId.Call the corresponding
	 * method of Respository interface.
	 */

	public User getUserById(String userId) throws UserNotFoundException {
		User user = userRepository.findById(userId).get();
		if (user == null) {
			throw new UserNotFoundException("Not Found");
		}
		return user;
	}

}
