import { Injectable } from '@angular/core';
import { Alert } from '../interface/alert';
import { Subject } from 'rxjs/Subject'
@Injectable()
export class AlertService {

alertSettings = new Subject<Alert>()

  constructor() { }

  create(title:string,type:string,time:number,body:string){
    this.alertSettings.next({
      title,
      type,
      time,
      body
    });
  }

}
