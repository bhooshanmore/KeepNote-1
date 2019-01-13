import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user-view',
  templateUrl: './edit-user-view.component.html',
  styleUrls: ['./edit-user-view.component.css']
})
export class EditUserViewComponent implements OnInit {

  private user: User;
  private userId: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private routerService: RouterService) {
    this.activatedRoute.params.subscribe(param => this.userId = param.userId);
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  onSave() {
    this.userService.updateUser(this.user).subscribe(user => this.routerService.routeToUser());
  }

}
