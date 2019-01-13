import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Reminder } from '../reminder';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage: string;
  note: Note;
  notes: Note[];
  categories: Category[];
  reminders: Reminder[];
  checkedReminders: Reminder[];
  noteTakerForm = this.formBuilder.group({
    noteTitle: [''],
    noteContent: [''],
    category: [''],
    reminder: ['']
  })

  constructor(private formBuilder: FormBuilder, private notesService: NotesService, private categoryService: CategoryService,
    private reminderService: ReminderService, private authService: AuthenticationService) {
    this.note = new Note();
    this.notes = [];
    this.reminders = [];
    this.checkedReminders = [];
    this.notesService.getNotes().subscribe(res => {
      this.notes = res;
      this.categoryService.getCategoriesForNotes().subscribe(res => {
        this.categories = res;
      })
      this.reminderService.getReminders();
      this.reminderService.getAllReminders().subscribe(res => {
        this.reminders = res.filter(reminder => reminder.reminderCreatedBy == this.authService.getUserId());
      })
    });
  }

  saveNote() {
    this.note = this.noteTakerForm.value;
    this.note.noteStatus = 'not-started'
    if (this.checkedReminders != null && this.checkedReminders.length > 0) {
      this.note.reminders = this.checkedReminders;
    } else {
      this.note.reminders = null;
    }
    if (!this.note.category) {
      this.note.category = null;
    } else {
      this.note.category.categoryId = this.note.category.id;
    }
    if (this.note.noteContent === '' || this.note.noteTitle === '') {
      this.errMessage = 'Title and Text both are required fields';
    }
    if (this.note.noteContent != null && this.note.noteTitle != null) {
      this.notesService.addNote(this.note).subscribe(addnote => {
        this.notesService.fetchNotesFromServer();
      }, error => {
        const index = this.notes.findIndex(note => note.noteTitle === this.note.noteTitle);
        this.notes.splice(index, 1);
        this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
      });
    }
    this.noteTakerForm.reset();
    this.checkedReminders = [];
  }

  onChange(reminder, event) {
    if (event.target.checked) {
      this.checkedReminders.push(reminder);
    }
    else if (!event.target.checked) {
      const index = this.checkedReminders.findIndex(rem => rem.reminderId === reminder.reminderId);
      this.checkedReminders.splice(index, 1);
    }
  }
}
