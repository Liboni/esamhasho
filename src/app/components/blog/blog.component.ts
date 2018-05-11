import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service'
import { Blog } from '../../class/blog'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthenticationService } from '../../services/authentication.service';
import {  UserService } from '../../services/user.service';
import { UserProfileDetails } from '../../class/user';
import { Token } from '../../class/token';
import { StatisticsService } from '../../services/statistics.service';
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs:Blog[];
  token:Token;
  userDetails:UserProfileDetails; 
  b :any;
  public search:any;
  constructor(private statisticsService:StatisticsService,private userService:UserService,private spinnerService: Ng4LoadingSpinnerService, private blogService:BlogService) {
    this.userDetails = new UserProfileDetails;
   }

  ngOnInit() { 
    this.spinnerService.show();
    this.blogService.GetBlogs().subscribe((blogs)=>{  
      this.blogs = <Blog[]>blogs.json();    
   });

   this.token = { Name:localStorage.getItem(TOKEN_KEY)  }
   this.userService.GetUserDetails(this.token).subscribe((result)=>{ 
      this.userDetails=<UserProfileDetails>result.json();          
     });
     this.spinnerService.hide();   
  }

  saveViewer(blogId){
    this.token = { Name:localStorage.getItem(TOKEN_KEY)  }
      if(this.token.Name==null){
        console.log(blogId)
        this.statisticsService.AddBlogViewer(blogId);
      }
  }

}
