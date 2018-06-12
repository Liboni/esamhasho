import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private alertService: AlertService,public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  forgotPassword(userName){
    this.authenticationService.ForgotPassword(userName).subscribe((result)=>{
      if(result.json().Success ){
        this.alertService.create(
          "Forgot Password", 
          "success", 
          5000, 
          result.json().Message 
          ); 
      }
      else{
        this.alertService.create(
          "Forgot Password", 
          "danger", 
          5000, 
          result.json().Message 
          ); 
      }

    })
  }
}
