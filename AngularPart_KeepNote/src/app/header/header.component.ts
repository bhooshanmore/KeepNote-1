import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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

  routeToUserDetails(){
    this.routeService.routeToUserDetails();
  }

  logoutUser() {
    localStorage.removeItem('BearerToken');
    localStorage.removeItem('userId');
    this.routeService.routeToLogin();
  }
}
