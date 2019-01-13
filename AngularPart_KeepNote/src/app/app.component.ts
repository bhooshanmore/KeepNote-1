import { Component } from '@angular/core';
import { RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isNoteView = true;
  userId: string;

  constructor(private routeService: RouterService) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
  routeToNoteView() {
    this.isNoteView = true;
    this.routeService.routeToNoteView();
  }

  routeToListView() {
    this.isNoteView = false;
    this.routeService.routeToListView();
  }

  routeToCategory() {
    this.routeService.routeToCategory();
  }

  routeToReminder() {
    this.routeService.routeToReminder();
  }

}
