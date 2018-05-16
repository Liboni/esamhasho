import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Connection} from './connection';

@Injectable()
export class UserService {

  constructor(public connection :Connection,public http:Http) { }

GetUserDetails(token){  
return this.http.post(Connection.serveUrl+'UserService.svc/json/GetUserDetails',token) 
  .map((response: Response) => {     
    return response;                 
}).catch(this.handleError);  
}

UpdateUserDetails(formdata:FormData){
return this.http.post(Connection.serveUrl+'UserService.svc/json/UpdateUserDetails',formdata) 
.map((response: Response) => {  
 return response;                 
}).catch(this.handleError);  
}

private handleError(error: Response){  
  return Observable.throw(error.json().error || 'Server error');  
}  
}
