import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { FormControl ,Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: NgForm;
  user: User;
  submitMessage: String;
  userId: String;
  userName: String;
  //  public user: User;
  // userPassword = new FormControl('',[Validators.required, Validators.minLength(4)]);
  // firstName = new FormControl('',[Validators.required]);
  // lastName = new FormControl('',[Validators.required]);
  // userRole = new FormControl('',[Validators.required]);
  // userMobile = new FormControl('',[Validators.required]);
  // userName= new FormControl('',[Validators.required]);

  constructor( private userService: UserService,
    private authService: AuthenticationService, private routerService: RouterService) { 
      this.user = new User();
    }

  ngOnInit() {
  }

  signUpUser(signUpForm: NgForm) {
    // this.user.userPassword = this.userPassword.value;
    // this.user.userRole = this.userRole.value;
    // this.user.userMobile = this.userMobile.value;
    // this.user.firstName = this.firstName.value;
    // this.user.lastName = this.lastName.value;
    // this.user.userName = this.userName.value;//(this.user.firstName).concat(' ' + this.user.lastName);
    // this.user.userId = this.user.firstName;
    this.user=signUpForm.value;
    this.authService.createUser(this.user).subscribe(res => {
      this.userService.createUser(this.user).subscribe(response => {
        this.authService.setUserId(this.user.userId);
      });
      this.routerService.routeToLogin();
    });
  }

}
