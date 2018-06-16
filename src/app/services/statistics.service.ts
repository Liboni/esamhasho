import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response  } from '@angular/http';
import { Viewer } from '../class/viewer';
import { Connection} from './connection';

@Injectable()
export class StatisticsService {
  view: Viewer;
  constructor(public connection :Connection,public http: Http) {
  }

  GetGuestDetails() {
    return this.http.get('https://ipinfo.io')
      .map((response: Response) => {
        return response;
      }).catch(this.handleError);
  }

  GetBlogViews() {
    return this.http.get(Connection.serveUrl+'BlogService.svc/json/GetBlogViews')
      .map((response: Response) => {
        return response;
      }).catch(this.handleError);
  }

  GetProductViews() {
    return this.http.get(Connection.serveUrl+'ProductService.svc/json/GetProductViews')
      .map((response: Response) => {
        return response;
      }).catch(this.handleError);
  }

  AddProductViewer(productId) {
    this.GetGuestDetails().subscribe((result) => {
      result = result.json();
      this.view = {
        Country: result.country,
        DataId: Number(productId),
        IpAddress: result.ip,
        Town: result.loc,
        ViewId: 0           
        
      } 
      this.Post(Connection.serveUrl+'ProductService.svc/json/AddProductViewer', this.view) .subscribe((data) => {  });
    });
  }

  Post(url, data) {
    
    return this.http.post(url, data)
    .map((response: Response) => {
      return response;
    }).catch(this.handleError);
  }
  
  AddBlogViewer(blogId) {
    this.GetGuestDetails().subscribe((result) => {
      result = result.json();
      this.view = {
        Country: result.country,
        ViewId: 0,
        DataId: Number(blogId),
        IpAddress: result.ip,
        Town: result.loc
      }    
      this.Post(Connection.serveUrl+'BlogService.svc/json/AddBlogViewer', this.view).subscribe((data) => { });
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
