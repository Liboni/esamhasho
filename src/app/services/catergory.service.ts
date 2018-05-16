import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Connection} from './connection';

@Injectable()
export class CatergoryService {

  constructor(public connection :Connection,public http:Http) { 
  
  }

  AddCatergory(catergoryName:String){
    return this.http.get(Connection.serveUrl+'CatergoryService.svc/json/AddCatergory/'+catergoryName) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  GetAllCatergories(){
    return this.http.get(Connection.serveUrl+'CatergoryService.svc/json/GetAllCatergories') 
            .map((response: Response) => {  
              return response;                 
          }).catch(this.handleError);  
  }

  DeleteCatergory(catergoryId){
    return this.http.get(Connection.serveUrl+'CatergoryService.svc/json/DeleteCatergory/'+catergoryId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }
  
  private handleError(error: Response){  
    return Observable.throw(error.json().error || 'Server error');  
  }  

}
