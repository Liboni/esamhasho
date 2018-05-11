import { Component, OnInit, ViewChild  } from '@angular/core';
import { Product, CreateProductResponse } from '../../../../class/product';
import { ProductService } from '../../../../services/product.service';
import { ActionResult } from '../../../../class/action-result';
import { Catergory } from '../../../../class/catergory';
import { CatergoryService } from '../../../../services/catergory.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  display:string;
  AddProductBtnText:String;
  products:Product[];
  product:Product;
  catergoryList:Catergory[];
  p :any;
  public search:any;
  @ViewChild('filesInput') filesInput;
  constructor(private alertService: AlertService,private productService:ProductService, private catergoryService:CatergoryService,private spinnerService: Ng4LoadingSpinnerService) { 
  }

  ngOnInit() {    
    this.AddProductBtnText= "Add";   
    this.productService.GetAllProducts().subscribe((products)=>{
      this.products= <Product[]>products.json();
   });
   this.catergoryService.GetAllCatergories().subscribe((catergories)=>{
   this.catergoryList = <Catergory[]>catergories.json();
  });
}

toggleAddProduct(AddProductBtnText){
    if(AddProductBtnText== "Close"){
      this.AddProductBtnText= "Add";
      this.display="none";      
    }
    if(AddProductBtnText== "Add"){
      this.AddProductBtnText= "Close";
      this.display="block";   
    }
  }

  closepopup(){
    this.AddProductBtnText= "Add";
    this.display="none";
  }

  saveProduct(
    name: string, 
    manufacturer: string, 
    price: number,
    per: string, 
    catergory: number, 
    shortdescription: string,
    description: string,
    isMain:Boolean,
    IsActive:Boolean
  ){
    this.spinnerService.show();
    this.closepopup();
    const formData = new FormData();   
    formData.append("media", this.filesInput.nativeElement.files[0]);
    var date = new Date();
    let code = date.getTime(); 
    formData.append("code", String(code));
    formData.append("manufacturer", manufacturer);
    formData.append("price", String(price));
    formData.append("per", per);
    formData.append("catergory", String(catergory));
    formData.append("shortDescription", shortdescription);
    formData.append("description", description);
    formData.append("userId", "35ae5e07-86c4-4243-9aab-7d29cd3a991d");
    formData.append("name", name);
    formData.append("name", String(isMain));
    formData.append("name", String(IsActive));
    this.productService.CreateProduct(formData).subscribe((result)=>{
         let productReponse= <CreateProductResponse>result.json();
         this.product = {
            Catergory:productReponse.Catergory,
            Price:price,
            ProductId:productReponse.ProductId,
            ShortDescription:shortdescription,
            Per:per,
            Name:name,
            Manufacturer:manufacturer,
            Description:description,
            Code:String(code),
            CreatedDate:productReponse.DateCreated,
            IsDeleted:false,
            MediaSource:productReponse.MediaSource,
            ModifiedDate:"",
            Views:0,
            CatergoryId:catergory,
            UserId:"",
            IsMain:isMain,
            IsActive:IsActive
         }
         this.products.unshift(this.product);
         this.spinnerService.hide();
    });     
  }
  deleteProduct(product){  
    this.spinnerService.show();  
    this.productService.DeleteProduct(product.ProductId).subscribe((result)=>{
       let actionResult =<ActionResult>result.json();
       if(actionResult.Success){
       const index: number = this.products.indexOf(product);
       this.products.splice(index,1)
       this.spinnerService.hide();
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
