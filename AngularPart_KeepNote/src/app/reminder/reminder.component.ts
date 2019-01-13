import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminder: Reminder;
  reminderArr: Array<Reminder>;
  private errMessage: string;
  reminderName = new FormControl('', Validators.compose([Validators.required]));
  reminderDescription = new FormControl('', Validators.compose([Validators.required]));
  reminderType = new FormControl('', Validators.compose([Validators.required]));

  constructor(private reminderService: ReminderService, private routerService: RouterService,
  private authService: AuthenticationService ) { }

  ngOnInit() {
    this.reminder = new Reminder();
    this.reminderArr = [];
    this.reminderService.getReminders();
    this.reminderService.getAllReminders().subscribe(res => {
      this.reminderArr = res.filter(reminder => reminder.reminderCreatedBy == this.authService.getUserId());
    })
  }

  createReminder() {
    this.reminder.reminderName = this.reminderName.value;
    this.reminder.reminderDescription = this.reminderDescription.value;
    this.reminder.reminderType = this.reminderType.value;
    this.reminderService.createReminder(this.reminder).subscribe(res => {
      this.reminderArr.push(res);
    });
  }

  deleteReminder(reminderId) {
    this.reminderService.deleteReminder(reminderId).subscribe(result => {
      const index = this.reminderArr.findIndex(ele => ele.reminderId == reminderId);
      this.reminderArr.splice(index, 1);
    });
  }

  updateReminder(reminderId) {
    this.routerService.routeToEditReminderView(reminderId);
  }

  routeToNotes(reminderId) {
    this.routerService.routeToReminderNotes(reminderId);
  }
}
