import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ChangePassword } from '../../../class/authentication';
import { AlertService } from '../../../services/alert.service';
import { UserProfileDetails } from '../../../class/user';
import { Token } from '../../../class/token';
import { UserService } from '../../../services/user.service';
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ChangePassword: ChangePassword;
  userDetails:UserProfileDetails; 
  token:Token;
  @ViewChild('form') form;
  constructor( private userService:UserService,private alertService: AlertService,public authenticationService: AuthenticationService) {
    this.ChangePassword = new ChangePassword;
    this.token = { Name:localStorage.getItem(TOKEN_KEY)  }
    this.userService.GetUserDetails(this.token).subscribe((result)=>{ 
       this.userDetails=<UserProfileDetails>result.json();    
      }); 
  }

  ngOnInit() {
  }
  changePassword() {
    this.ChangePassword = {
      NewPassword: this.form.newpassword,
      OldPassword: this.form.oldpassword,
      Username:  this.userDetails.UserName
    }        
    this.authenticationService.ChangePassword(this.ChangePassword).subscribe((result) => {   
      if(result.json().Success){
        this.alertService.create(
          "Change Password", 
          "success", 
          5000, 
          result.json().Message 
          ); 
          this.form.reset();
      }
      else{
        this.alertService.create(
          "Change Password", 
          "danger", 
          5000, 
          result.json().Message 
          ); 
      }      
    });
  }
}
