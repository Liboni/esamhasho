import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
name:string;
hobbies:string[];
posts:Post[];

  constructor(private dataService:DataService) {

   }

  ngOnInit() {
     this.dataService.getPosts().subscribe((posts)=>{
      this.posts = posts;
    })
  }  
}

interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}



