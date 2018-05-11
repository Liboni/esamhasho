import { Component, OnInit,ViewChild } from '@angular/core';
import { UserProfileDetails } from '../../../class/user';
import { UserService } from '../../../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Token } from '../../../class/token';
import { ActionResult } from '../../../class/action-result';
import { AlertService } from '../../../services/alert.service'
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild('filesInput') filesInput;
  userDetails:UserProfileDetails; 
  token:Token;
  actionResult:ActionResult;

  constructor(private alertService: AlertService,private spinnerService: Ng4LoadingSpinnerService, private userService:UserService) { 
    this.userDetails = new UserProfileDetails; 
  }

  ngOnInit() {
    this.spinnerService.show();
    this.token = { Name:localStorage.getItem(TOKEN_KEY)  }
    this.userService.GetUserDetails(this.token).subscribe((result)=>{ 
       this.userDetails=<UserProfileDetails>result.json();    
      });
      this.spinnerService.hide();     
  }

  updateUserDetails(aboutMe,address,city,country,firstName,lastName,email,phonenumber){
    this.spinnerService.show();
    const formData = new FormData();   
    formData.append("media", this.filesInput.nativeElement.files[0]);
    formData.append("token", localStorage.getItem(TOKEN_KEY));
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("aboutMe", aboutMe);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phonenumber", phonenumber);
    this.userService.UpdateUserDetails(formData).subscribe((result)=>{
      this.actionResult =<ActionResult>result.json();
      if(this.actionResult.Success){
        this.alertService.create(
          "User details", 
          "success", 
          5000, 
          "User details saved successfully" 
          );      
      }
    else{
      this.alertService.create(
        "User details", 
        "danger", 
        5000, 
        "Failed to save user details, try again" 
        );     
     }
      this.spinnerService.hide();
      });
  }

  previewImage(event) {
     if (event.target.files[0]) {
        var reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]);
          reader.onload =  (event)=> {
          this.userDetails.ProfilePicture= reader.result;
        };     
      }
    }
}
