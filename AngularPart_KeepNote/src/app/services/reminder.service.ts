import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RouterService } from './router.service';


@Injectable()
export class ReminderService {
  public url = 'http://localhost:8081/api/v1/reminder';
  private reminderArr: Reminder[];
  private reminderBehavior: BehaviorSubject<Array<Reminder>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
     private router: RouterService) {
    this.reminderArr =  [];
    this.reminderBehavior = new BehaviorSubject(this.reminderArr);
   }
   
  createReminder(reminder: Reminder): Observable<Reminder>{
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    reminder.reminderCreatedBy = userId;
    return this.httpClient.post<Reminder>(`${this.url}`, reminder,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
   }   

  deleteReminder(reminderId): any{
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.delete<any>(`${this.url}/${reminderId}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  updateReminder(reminder: Reminder): Observable<Reminder>{
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    reminder.reminderCreatedBy = userId;
    return this.httpClient.put<Reminder>(`${this.url}/${reminder.reminderId}`, reminder,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getReminderById(reminderId): Observable<Reminder>{
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Reminder>(`${this.url}/${reminderId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getReminders(){
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    if(userId === null || bearerToken === null){
      this.router.routeToLogin();
    }
    return this.httpClient.get<Array<Reminder>>(`${this.url}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }).subscribe(res => {
      this.reminderArr = res;
      this.reminderBehavior.next(this.reminderArr);
     },error =>{
       this.router.routeToLogin();
     });
  }

  getAllReminders(): BehaviorSubject<Array<Reminder>>{
    return this.reminderBehavior;
  }

}
