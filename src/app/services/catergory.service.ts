import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class CatergoryService {

  constructor(public http:Http) { 
  
  }

  AddCatergory(catergoryName:String){
    return this.http.get('http://localhost:55148/CatergoryService.svc/json/AddCatergory/'+catergoryName) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  GetAllCatergories(){
    return this.http.get('http://localhost:55148/CatergoryService.svc/json/GetAllCatergories') 
            .map((response: Response) => {  
              return response;                 
          }).catch(this.handleError);  
  }

  DeleteCatergory(catergoryId){
    return this.http.get('http://localhost:55148/CatergoryService.svc/json/DeleteCatergory/'+catergoryId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }
  
  private handleError(error: Response){  
    return Observable.throw(error.json().error || 'Server error');  
  }  

}
