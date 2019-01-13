package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.repository.ReminderRepository;

@Service
public class ReminderServiceImpl implements ReminderService {

	private ReminderRepository reminderRepository;

	public ReminderServiceImpl(ReminderRepository reminderRepository) {
		this.reminderRepository = reminderRepository;
	}

	/*
	 * This method should be used to save a new reminder.Call the corresponding
	 * method of Respository interface.
	 */
	@Transactional
	public Reminder createReminder(Reminder reminder) throws ReminderNotCreatedException {
		reminder.setReminderCreationDate(new Date());
		return Optional.ofNullable(reminderRepository.insert(reminder))
				.orElseThrow(() -> new ReminderNotCreatedException("Not created"));
	}

	/*
	 * This method should be used to delete an existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	@Transactional
	public boolean deleteReminder(String reminderId) throws ReminderNotFoundException {
		boolean delete = false;
		Reminder reminder = reminderRepository.findById(reminderId).orElse(null);
		if (reminder != null) {
			reminderRepository.delete(reminder);
			delete = true;
		} else {
			throw new ReminderNotFoundException("Not found");
		}
		return delete;
	}

	/*
	 * This method should be used to update a existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	@Transactional
	public Reminder updateReminder(Reminder reminder, String reminderId) throws ReminderNotFoundException {
		Reminder updateReminder = null;
		Reminder reminderObj = reminderRepository.findById(reminderId).get();
		if (reminderObj != null) {
			reminderRepository.save(reminder);
			updateReminder = reminder;
		} else {
			throw new ReminderNotFoundException("Not found");
		}
		return updateReminder;
	}

	/*
	 * This method should be used to get a reminder by reminderId.Call the
	 * corresponding method of Respository interface.
	 */
	public Reminder getReminderById(String reminderId) throws ReminderNotFoundException {
		Reminder reminder = reminderRepository.findById(reminderId).get();
		if (reminder == null) {
			throw new ReminderNotFoundException("Not found");
		}
		return reminder;
	}

	/*
	 * This method should be used to get all reminders. Call the corresponding
	 * method of Respository interface.
	 */

	public List<Reminder> getAllReminders() {

		return reminderRepository.findAll();
	}

}
