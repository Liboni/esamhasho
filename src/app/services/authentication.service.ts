import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SignInUser, SignUp, ChangePassword } from '../class/authentication';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(public http:Http,  private router: Router) {
  }

  SignIn(signInUser:SignInUser){
    return this.http.post('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/SignIn',signInUser) 
    .map((response: Response) => {       
      return response;                 
  }).catch(this.handleError); 
  }

  SignUp(signUp:SignUp){
    return this.http.post('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/SignUp',signUp) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

   ForgotPassword(username:String){
    return this.http.get('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/ForgotPassword/'+username) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  VerifyEmail(guidCode:String){
    return this.http.get('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/VerifyEmail/'+guidCode) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  ChangePassword(changePassword:ChangePassword){
    return this.http.post('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/ChangePassword',changePassword) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  LockUser(userId){
    return this.http.get('http://62aa9ba5.ngrok.io/AuthenticationService.svc/json/LockUser/'+userId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  private handleError(error: Response){  
    return Observable.throw(error.json().error || 'Server error');  
  } 
}
