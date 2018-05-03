import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductMediaResponse } from '../../class/product';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserProfileDetails } from '../../class/user';
import { Token } from '../../class/token';
import {  UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../class/notification';
import { ActionResult } from '../../class/action-result';
import { AlertService } from '../../services/alert.service';
import { StatisticsService } from '../../services/statistics.service';
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product;
  productId:String;
  selectedImage:Number;
  token:Token;
  userDetails:UserProfileDetails; 
  productMedias:ProductMediaResponse[];
  notifications:Notification[];
  actionResult:ActionResult;
  constructor(private statisticsService:StatisticsService ,private alertService: AlertService,private notificationService:NotificationService, private userService:UserService,private spinnerService: Ng4LoadingSpinnerService, private productService:ProductService, private route: ActivatedRoute) { 
    this.product = new Product;   
    this.userDetails = new UserProfileDetails;
    this.actionResult = new ActionResult;
    }

  ngOnInit() {
    this.spinnerService.show();
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.GetProduct(this.productId).subscribe((products)=>{
      this.product = <Product>products.json(); 
      this.productService.GetProductMedia(this.productId).subscribe((media)=>{
        this.productMedias = <ProductMediaResponse[]>media.json();
        this.selectedImage = this.productMedias[0].Id
        this.token = { Name:localStorage.getItem(TOKEN_KEY)  }
        this.userService.GetUserDetails(this.token).subscribe((result)=>{ 
           this.userDetails=<UserProfileDetails>result.json();  
           this.notificationService.GetNotificationsByProduct(this.productId).subscribe((result)=>{
               this.notifications = <Notification[]>result.json();
              if(this.token.Name==null){
                this.statisticsService.AddProductViewer(this.productId);
               }              
            });    
           this.spinnerService.hide();        
          });
        this.spinnerService.hide();
      });
   }); 
  }

   commentProduct(message,phone,name,email){
     let notification = new Notification;
     notification = {
       Email:email,
       IsDeleted:false,
       FromCustomer:true,
       Message:message,
       DateCreated:"",
       IsRead:false,
       Phone:phone,
       Name:name,  
       ProductId: Number(this.productId),
       NotificationTypeId:1,
       Id:0
     }
      this.notificationService.AddNotification(notification).subscribe((result)=>{
      this.actionResult = <ActionResult>result.json();
      if(!this.actionResult.Success){
        this.alertService.create(
          "Feedback", 
          "danger", 
          5000, 
          "Failed to post messge, try again." 
          );          
      }
      else{
        this.notifications.unshift(notification);
        this.alertService.create(
          "Feedback", 
          "success", 
          5000, 
          "Thank you for you feedback." 
          ); 
      }
     });
   }
  

  selectImage(imageName){
   this.selectedImage=imageName;   
  }

}
