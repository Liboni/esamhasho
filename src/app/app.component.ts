import { Component } from '@angular/core';
import { TokenStorageService } from './core/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 })
export class AppComponent {
 public isLoggedIn: boolean; 
  constructor(private token: TokenStorageService,private router: Router) {   
  }
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem(TOKEN_KEY)?true:false;
  }

  logout(){
    this.isLoggedIn = false;
    this.token.signOut();
    this.router.navigate(['/']);
  }
}
