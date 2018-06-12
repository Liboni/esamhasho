import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SignInUser } from '../../class/authentication';
import { ActionResult } from '../../class/action-result';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component'
import { TokenStorageService } from '../../core/token-storage.service'
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInUser:SignInUser;
  actionResult:ActionResult;

  constructor(private alertService: AlertService,private token:TokenStorageService, private appComponent:AppComponent,private router: Router,private spinnerService: Ng4LoadingSpinnerService,private authenticationService:AuthenticationService) { }

  ngOnInit() {   
  }

  login(userName,password){
    this.signInUser = {
      Password:password,
      RememberMe:true,
      Username:userName
    }
    this.authenticationService.SignIn(this.signInUser).subscribe((results)=>{
      this.actionResult= <ActionResult>results.json();
      if(this.actionResult.Success){   
        this.token.saveToken(this.actionResult.Message);
        this.appComponent.isLoggedIn = true;
       this.router.navigate(['dashboard/statistics']); 
        }     
        else{
          this.alertService.create(
            "Login", 
            "danger", 
            5000, 
            this.actionResult.Message 
            ); 
        }
    });
  }

}
