import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Connection} from './connection';

@Injectable()
export class BlogService {

  constructor(public connection :Connection,public http:Http) { 

  }

  AddBlog(formData:FormData){
    return this.http.post(Connection.serveUrl+'BlogService.svc/json/AddBlog',formData) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  DeleteBlog(blogId){
    return this.http.get(Connection.serveUrl+'BlogService.svc/json/DeleteBlog/'+blogId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  GetBlogs(){
    return this.http.get(Connection.serveUrl+'BlogService.svc/json/GetBlogs') 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }

  BlogViewed(blogId){
    return this.http.get(Connection.serveUrl+'BlogService.svc/json/BlogViewed'+blogId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError); 
  }
  private handleError(error: Response){  
    return Observable.throw(error.json().error || 'Server error');  
  } 
}
