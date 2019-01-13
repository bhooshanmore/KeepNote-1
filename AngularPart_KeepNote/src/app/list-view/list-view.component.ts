import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { log } from 'util';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  navigationSubscription: any;
  constructor(private noteService: NotesService, private activateRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getData() {
    this.noteService.getNotes().subscribe(res => {
      const groupedNotes = this.groupby(res, 'noteStatus');
      const started = groupedNotes['started'];
      const notstarted = groupedNotes['not-started'];
      const completed = groupedNotes['completed'];
      this.startedNotes = started != null ? started : [];
      this.notStartedNotes = notstarted != null ? notstarted : [];
      this.completedNotes = completed != null ? completed : [];
    });
  }

  groupby(arr, state) {
    return arr.reduce(function (acc, obj) {
      const key = obj[state];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }


}

