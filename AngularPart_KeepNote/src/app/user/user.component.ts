import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private routerService: RouterService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getUserById(this.authService.getUserId()).subscribe(result => {
      this.user = result;
    });
  }

  deleteUser() {
    this.userService.deleteUser().subscribe(res => {
      localStorage.removeItem("userId");
      localStorage.removeItem("bearerToken");
      this.routerService.routeToLogin();
    })
  }

  updateUser() {
    this.routerService.routeToEditUserView(this.user.userId);
  }

}
