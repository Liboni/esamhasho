import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../../services/blog.service'
import { Blog } from '../../../class/blog'
import { ActionResult } from '../../../class/action-result';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit {
  blogs:Blog[];
  blog:Blog;
  display:string;
  AddBlogBtnText:String;
  b :any;
  public search:any;
  @ViewChild('filesInput') filesInput;
  constructor(private alertService: AlertService,private spinnerService: Ng4LoadingSpinnerService, private blogService:BlogService) { }

  ngOnInit() {
    this.AddBlogBtnText= "Add";   
    this.blogService.GetBlogs().subscribe((blogs)=>{    
     this.blogs = <Blog[]>blogs.json();
   });
  }

  toggleAddBlog(AddBlogBtnText){
    if(AddBlogBtnText== "Close"){
      this.AddBlogBtnText= "Add";
      this.display="none";      
    }
    if(AddBlogBtnText== "Add"){
      this.AddBlogBtnText= "Close";
      this.display="block";   
    }
  }
  
 
  closepopup(){
    this.AddBlogBtnText= "Add";
    this.display="none";
  }

  deleteBlog(blog){
    this.spinnerService.show();
    this.blogService.DeleteBlog(blog.Id).subscribe((catergories)=>{
      const index: number = this.blogs.indexOf(blog);
      this.blogs.splice(index,1)
      this.spinnerService.hide();
   });
  }

  addBlog(name,description,titleDescription){
    this.spinnerService.show();
    const formData = new FormData();   
    formData.append("media", this.filesInput.nativeElement.files[0]);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("titleDescription", titleDescription);
    this.blogService.AddBlog(formData).subscribe((result)=>{
         this.blog  = <Blog>result.json();        
         this.AddBlogBtnText= "Add";
         this.display="none";   
         if(this.blog.Name){
          this.blogs.unshift(this.blog); 
         }    
         else{
          this.alertService.create(
            "Blog", 
            "danger", 
            5000, 
            "Failed to save blog, try again." 
            );           
         }          
   });
   this.spinnerService.hide();   
  }

  ViewBlog(blogId){
    this.blogService.BlogViewed(blogId).subscribe((result)=>{   
     });
  }
}
