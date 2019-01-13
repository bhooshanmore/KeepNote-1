import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ActivatedRoute } from '@angular/router';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material';
import { EditReminderViewComponent } from '../edit-reminder-view/edit-reminder-view.component';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  reminderId: string;
  reminder: Reminder;
  constructor(private activateRoute: ActivatedRoute, private reminderService: ReminderService,
    private routerService: RouterService, private matdialog: MatDialog) {
    this.activateRoute.params.subscribe(param => this.reminderId = param.reminderId);
    this.reminderService.getReminderById(this.reminderId).subscribe(res => {
      this.reminder = res;
      this.matdialog.open(EditReminderViewComponent, {
        data: this.reminder
      }).afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
    });
  }

  ngOnInit() {
  }

}
