import { Component, OnInit ,NgZone} from '@angular/core';
import { trigger,transition,style,state, animate } from '@angular/animations'
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations:[
    trigger('dialog',[
      transition('void => *',[
        style({transform:'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('void => *',[
        animate(100, style({transform:'scale3d(.3, .3, .3)'}))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {

  modalStatus : boolean;
  title:string;
  type:string;
  time:number;
  body:string;

  color: string;
  backColor:string;
  constructor(private alertService:AlertService, private ngZone:NgZone) { }

  ngOnInit() {
    this.alertService.alertSettings.subscribe((data)=>{
      this.time= data.time;
      this.title = data.title;
      this.type = data.type;
      this.body = data.body
      
      if(this.type == "danger"){
        this.backColor = "#dc3545";
      }
      if(this.type == "info"){
        this.backColor = "#117a8b";
      }
      if(this.type == "success"){
        this.backColor = "#28a745";
      }
      this.modalStatus = true;

      this.ngZone.runOutsideAngular(()=>
          setTimeout(()=>
            this.ngZone.run(()=>
                this.modalStatus = false
             ), this.time
           )
       )
    })
  }

  resolve(){
    this.modalStatus = false;
  }

}
