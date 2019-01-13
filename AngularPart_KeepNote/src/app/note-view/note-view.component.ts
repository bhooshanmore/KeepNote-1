import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit, OnDestroy {

  errMessage: string;
  notes: Array<Note>;
  categoryId: string = null;
  reminderId: string = null;
  navigationSubscription: any;
  constructor(private noteService: NotesService, private activateRoute: ActivatedRoute, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
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
    this.activateRoute.params.subscribe(param => {
      if (typeof param.categoryId != "undefined" || param.categoryId != null) {
        this.categoryId = param.categoryId;
      }
    });
    this.activateRoute.params.subscribe(param => {
      if (typeof param.reminderId != "undefined" || param.reminderId != null) {
        this.reminderId = param.reminderId;
      }
    });
    this.noteService.fetchNotesFromServer();
    this.noteService.getNotes().subscribe(
      response => {
        this.notes = response;
        console.log('notes' + JSON.stringify(this.notes));
        if (this.categoryId != null) {
          this.notes = this.notes.filter(res => res.category != null
            && res.category.categoryId === this.categoryId)

        }
        if (this.reminderId != null) {
          let newNotes = [];
          this.notes.forEach(res => {
            if (res.reminders != null) {
              let reminder = res.reminders.filter(response => this.reminderId === response.reminderId);
              if (reminder != null && reminder.length > 0) {
                newNotes.push(res);
              }
            }
          })

          this.notes = newNotes;
        }
      }, error => {
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
      });
  }
  
  removeAllNotes() {
    this.noteService.deleteAllNotes().subscribe(res => {
      this.notes = [];
    });
  }

}
