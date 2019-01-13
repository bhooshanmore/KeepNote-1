import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import { RouterService } from './router.service';
import { Noteuser } from '../noteuser';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  public url = 'http://localhost:8082/api/v1/note';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
    private router: RouterService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    if (userId === null || bearerToken === null) {
      this.router.routeToLogin();
    }
    this.httpClient.get<Note[]>(`${this.url}/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    }).subscribe(notesResponse => {
      this.notes = notesResponse;
      this.notesSubject.next(this.notes);
    }, error => {
      this.router.routeToLogin();
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    note.noteCreatedBy = userId;
    return this.httpClient.post<Note>(`${this.url}`, note,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  editNote(note: Note): Observable<Note> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.put<Note>(`${this.url}/${userId}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
    }).do(editNote => {
      const data = this.notes.find(notes => notes.noteId === editNote.noteId);
      Object.assign(data, editNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteByNoteId(noteId): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.get<Note>(`${this.url}/${userId}/${noteId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  deleteNote(noteId): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.delete<any>(`${this.url}/${userId}/${noteId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  deleteAllNotes(): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.delete<any>(`${this.url}/${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  addUserNote(noteuser: Noteuser): Observable<Noteuser> {
    console.log('Inside service');
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    noteuser.userId = userId;
    return this.httpClient.put<Noteuser>(`${this.url}/${userId}/usernote`, noteuser,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

}
