import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product, CreateProductResponse ,UpdateProductRequest, SearchProductRequest} from '../../../../class/product';
import { Catergory } from '../../../../class/catergory';
import { CatergoryService } from '../../../../services/catergory.service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActionResult } from '../../../../class/action-result';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-product-edit-details',
  templateUrl: './product-edit-details.component.html',
  styleUrls: ['./product-edit-details.component.css']
})
export class ProductEditDetailsComponent implements OnInit {
  product:Product;
  catergoryList:Catergory[];
  updateProductRequest:UpdateProductRequest;
  productId:String
  constructor(private alertService: AlertService,private spinnerService: Ng4LoadingSpinnerService, private productService:ProductService, private catergoryService:CatergoryService,private route: ActivatedRoute) { 
    this.product = new Product; 
  }

  ngOnInit() {
    this.spinnerService.show();
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.GetProduct(this.productId).subscribe((products)=>{
      this.product = <Product>products.json();     
      this.spinnerService.hide();
   });
   this.catergoryService.GetAllCatergories().subscribe((catergories)=>{
    this.catergoryList = <Catergory[]>catergories.json();
    this.spinnerService.hide();
   });
  }

  updateProduct(
    name: string,
    manufacturer: string, 
    price: number,
    per: string, 
    catergory: number, 
    shortdescription: string,
    description: string
  )
  {
    this.updateProductRequest =  {
      Description:description,
      Manufacturer:manufacturer,
      Name:name,
      Per:per,
      Price:price,
      Catergory:catergory,
      ShortDescription:shortdescription,
      ProductId:Number(this.productId)
    }
    this.productService.UpdateProduct(this.updateProductRequest).subscribe((result)=>{ 
      let actionResult = <ActionResult>result.json();
      if(actionResult.Success){

      }
      else{
        this.alertService.create(
          "Product", 
          "danger", 
          5000, 
          actionResult.Message 
          ); 
      }
    });     
  }   
}
