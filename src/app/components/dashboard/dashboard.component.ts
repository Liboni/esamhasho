import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayMainPanel: string = "block";
  displaySideBar: string = "block";

  constructor() { }

  ngOnInit() {

  }

  toggle() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (this.displayMainPanel == "block") {      
      if (width < 767) {      
        this.displayMainPanel = "none";
        this.displaySideBar = "block";
    }
    else {
      this.displayMainPanel = "block";
      this.displaySideBar = "none";
    }
  }
  else {
    this.displayMainPanel = "block";
    this.displaySideBar = "block";
  }

  }
  sidebar(){
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(width);
    if (width < 767) {      
        this.displayMainPanel = "block";
        this.displaySideBar = "none";
    }
    else {
      this.displayMainPanel = "block";
      this.displaySideBar = "block";
    }

  }
}
