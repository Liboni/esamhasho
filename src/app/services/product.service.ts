import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { UpdateProductRequest, SearchProductRequest} from '../class/product';
import { Connection} from './connection';

@Injectable()
export class ProductService {

  constructor(public connection :Connection,public http:Http) {
     }
   
   CreateProduct(formdata:FormData){
         return this.http.post(Connection.serveUrl+'ProductService.svc/json/CreateProduct',formdata) 
            .map((response: Response) => {  
              return response;                 
          }).catch(this.handleError);  
   }
   
   GetProductMedia(productId){
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/GetProductMedia/'+productId) 
       .map((response: Response) => {  
         return response;                 
     }).catch(this.handleError);  
}

   SearchProduct(searchProductRequest:SearchProductRequest){
    return this.http.post(Connection.serveUrl+'ProductService.svc/json/SearchProduct',searchProductRequest) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  GetProduct(productId){ 
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/GetProduct/'+productId) 
    .map((response: Response) => {  
      return response;                 
   }).catch(this.handleError);  
  }

  DeleteProduct(productId){
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/DeleteProduct/'+productId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  DeleteProductMedia(productMediaId){
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/DeleteProductMedia/'+productMediaId) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  AddProductMedia(formdata:FormData){
    return this.http.post(Connection.serveUrl+'ProductService.svc/json/AddProductMedia',formdata) 
    .map((response: Response) => {  
      return response;                 
  }).catch(this.handleError);  
  }

  GetAllProducts(){
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/GetAllProducts') 
            .map((response: Response) => {  
              return response;                 
          }).catch(this.handleError);  
  }

  UpdateProduct(updateProductRequest:UpdateProductRequest){
    return this.http.post(Connection.serveUrl+'ProductService.svc/json/UpdateProduct',updateProductRequest) 
    .map((response: Response) => {  
      return response;                 
   }).catch(this.handleError);  
  }

  private handleError(error: Response){
    return Observable.throw(error.json().error || 'Server error');  
  }  

}
