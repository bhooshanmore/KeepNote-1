import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './router.service';

@Injectable()
export class UserService {

  public url = 'http://localhost:8080/api/v1/user';

  constructor(private authService: AuthenticationService, private httpClient: HttpClient,
    private router: RouterService) { }

  createUser(user: User): Observable<User> {
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.post<User>(`${this.url}`, user,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  updateUser(user: User): Observable<User> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.put<User>(`${this.url}/${userId}`, user,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  deleteUser(): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.delete<any>(`${this.url}/${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getUserById(userId): Observable<User> {
    const bearerToken = this.authService.getBearerToken();
    if (bearerToken === null) {
      this.router.routeToLogin();
    }
    return this.httpClient.get<User>(`${this.url}/${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

}
