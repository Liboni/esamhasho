import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../class/notification';
import { ActionResult } from '../../class/action-result';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  actionResult:ActionResult;
  constructor(private alertService: AlertService,private notificationService:NotificationService) { }

  ngOnInit() {
  }

  comment(message,phone,name,email){
    let notification = new Notification;
    notification = {
      Email:email,
      IsDeleted:false,
      FromCustomer:true,
      Message:message,
      DateCreated:"",
      IsRead:false,
      Phone:phone,
      Name:name, 
      ProductId: 0,
      NotificationTypeId:2,
      Id:0
    }
     this.notificationService.AddNotification(notification).subscribe((result)=>{
     this.actionResult = <ActionResult>result.json();
     if(!this.actionResult.Success){
       this.alertService.create(
         "Feedback", 
         "danger", 
         5000, 
         "Failed to post messge, try again." 
         );          
     }
     else{
      this.alertService.create(
         "Feedback", 
         "success", 
         5000, 
         "Thank you for you feedback." 
         ); 
     }
    });
  }
}
