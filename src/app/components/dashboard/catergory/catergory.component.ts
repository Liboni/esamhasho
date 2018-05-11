import { Component, OnInit } from '@angular/core';
import { CatergoryService } from '../../../services/catergory.service'
import { Catergory } from '../../../class/catergory'
import { ActionResult } from '../../../class/action-result';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-catergory',
  templateUrl: './catergory.component.html',
  styleUrls: ['./catergory.component.css']
})

export class CatergoryComponent implements OnInit {
  catergories:Catergory[];
  catergory:Catergory;
  display:string;
  AddCatergoryBtnText:String;
  c :any;
  public search:any;
  constructor(private alertService: AlertService,private spinnerService: Ng4LoadingSpinnerService,private catergoryService:CatergoryService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.AddCatergoryBtnText= "Add";   
    this.catergoryService.GetAllCatergories().subscribe((catergories)=>{    
      this.spinnerService.hide();
      this.catergories = <Catergory[]>catergories.json();      
   });
  }

  toggleAddCatergory(AddCatergoryBtnText){
    if(AddCatergoryBtnText== "Close"){
      this.AddCatergoryBtnText= "Add";
      this.display="none";      
    }
    if(AddCatergoryBtnText== "Add"){
      this.AddCatergoryBtnText= "Close";
      this.display="block";   
    }
  }
  closepopup(){
    this.AddCatergoryBtnText= "Add";
    this.display="none";
  }

  deleteCatergory(catergory){
    this.spinnerService.show();
    this.catergoryService.DeleteCatergory(catergory.Id).subscribe((catergories)=>{
      this.spinnerService.hide();
      const index: number = this.catergories.indexOf(catergory);
      this.catergories.splice(index,1);     
   });
  }

  addCatergory(catergoryName){
    this.spinnerService.show();
    this.catergoryService.AddCatergory(catergoryName).subscribe((result)=>{
      this.spinnerService.hide();  
      let actionResult = <ActionResult>result.json(); 
      this.AddCatergoryBtnText= "Add";
      this.display="none";    
      if(actionResult.Success){
        this.catergory =   {
          Id:Number(actionResult.Message),
          Name:catergoryName
           }
         this.catergories.unshift(this.catergory);        
         }
         else{
          this.alertService.create(
            "Catergory", 
            "danger", 
            5000, 
            "Failed to save catergory, try again." 
            );     
         }    
   });
  }
}
