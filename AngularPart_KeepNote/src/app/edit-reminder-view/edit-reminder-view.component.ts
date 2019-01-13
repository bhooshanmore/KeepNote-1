import { Component, OnInit, Inject } from '@angular/core';
import { Reminder } from '../reminder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit {

  private reminder: Reminder;
  errMessage: string;

  constructor(private dialog: MatDialogRef<EditReminderViewComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService: ReminderService,private routerService:RouterService) {
    this.reminder = this.data;
  }

  onSave() {
    this.reminderService.updateReminder(this.reminder).subscribe(res => {
      this.reminderService.getReminders();
    }, error => {
      this.errMessage = error.message;
    });
    this.dialog.close();
  }

  ngOnInit() {
  }

}
