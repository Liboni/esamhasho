import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProductService } from './services/product.service';
import { NotificationService } from './services/notification.service';
import { BlogService } from './services/blog.service';
import { CatergoryService } from './services/catergory.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { BlogEditorComponent } from './components/dashboard/blog-editor/blog-editor.component';
import { NotificationComponent } from './components/dashboard/notification/notification.component';
import { ProductEditorComponent } from './components/dashboard/product-editor/product-editor.component';
import { CatergoryComponent } from './components/dashboard/catergory/catergory.component';
import { ProductImagesComponent } from './components/dashboard/product-editor/product-images/product-images.component';
import { ProductListComponent } from './components/dashboard/product-editor/product-list/product-list.component';
import { ProductEditDetailsComponent } from './components/dashboard/product-editor/product-edit-details/product-edit-details.component';

import { NgxPaginationModule } from 'ngx-pagination'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthGuard } from './guard/auth.guard'
import { TokenStorageService } from './core/token-storage.service';
import { StatisticsService } from './services/statistics.service';
import { AlertModule } from './module/alert/alert.module';



const appRoutes:Routes= [
  {path:'', component:HomeComponent},
  {path:'blog', component:BlogComponent},
  {path:'login', component:LoginComponent},
  {path:'product-details/:id', component:ProductDetailsComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard],
    children:[   
        {path:'statistics', component:StatisticsComponent},
        {path:'user', component:UserComponent},
        {path:'blog-editor', component:BlogEditorComponent},
        {path:'catergory', component:CatergoryComponent},
        {path:'product-editor', 
          component:ProductEditorComponent,
            children:[
              {path:'list', component:ProductListComponent},
              {path:'details/:id', component:ProductEditDetailsComponent},
              {path:'images/:id', component:ProductImagesComponent}
            ]},
      {path:'notification', component:NotificationComponent}
  ]
},
  {path:'product-details', component:ProductDetailsComponent},
  {path:'contact', component:ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BlogComponent,
    LoginComponent,
    DashboardComponent,
    ProductDetailsComponent,
    StatisticsComponent,
    UserComponent,
    BlogEditorComponent,
    NotificationComponent,
    ProductEditorComponent,
    CatergoryComponent,
    ProductImagesComponent,
    ProductListComponent,
    ProductEditDetailsComponent
  ],
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(appRoutes),
    AlertModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    ProductService,
    NotificationService,
    BlogService,
    AuthenticationService,
    CatergoryService, 
    TokenStorageService,
    UserService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
 
 }