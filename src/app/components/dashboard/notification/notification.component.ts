import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service'
import { Notification } from '../../../class/notification'
import { ActionResult } from '../../../class/action-result';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications:Notification[];
  notification:Notification;
  unreadMessages:number;
  constructor(private alertService: AlertService,private spinnerService: Ng4LoadingSpinnerService,private notificationService:NotificationService) { }

  ngOnInit() {
    this.notificationService.GetAllNotifications().subscribe((notifications)=>{ 
      this.notifications = <Notification[]>notifications.json();
      this.unreadMessages=0;
      for (let notification of this.notifications) {
      if(notification.FromCustomer&& !notification.IsRead){
        this.unreadMessages++;
      }
     }      
   });   
  }

  addNotification(){
    this.notificationService.AddNotification(this.notification).subscribe((notifications)=>{ 
      let actionResult = <ActionResult>notifications.json(); 
      if(actionResult.Success){

      }
      else{
        this.alertService.create(
          "Product", 
          "danger", 
          5000, 
          actionResult.Message 
          ); 
      }
     });
  }

  markAsRead(notificationId){
    this.notificationService.ReadNotification(notificationId).subscribe((result)=>{  
      this.notificationService.GetAllNotifications().subscribe((notifications)=>{ 
        this.notifications = <Notification[]>notifications.json();
        this.unreadMessages=0;
        for (let notification of this.notifications) {
        if(notification.FromCustomer&& !notification.IsRead){
          this.unreadMessages++;
        }
       }      
     });   
     });
  }

  GetNotificationsByProduct(){
    
  }

}
