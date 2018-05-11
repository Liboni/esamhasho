import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Notification } from '../class/notification';

@Injectable()
export class NotificationService {

  constructor(public http:Http) {

   }

   AddNotification(notification:Notification){
    return this.http.post('http://62aa9ba5.ngrok.io/NotificationService.svc/json/AddNotification',notification) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
   }

   GetAllNotifications(){
    return this.http.get('http://62aa9ba5.ngrok.io/NotificationService.svc/json/GetAllNotifications') 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
   }

   GetNotificationsByProduct(productId){
    return this.http.get('http://62aa9ba5.ngrok.io/NotificationService.svc/json/GetNotificationsByProduct/'+productId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
   }

   ReadNotification(notificationId){
    return this.http.get('http://62aa9ba5.ngrok.io/NotificationService.svc/json/ReadNotification/'+notificationId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
   }

   private handleError(error: Response){  
    return Observable.throw(error.json().error || 'Server error');  
  } 

}
