import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  display:string;
  productcofiguration:string;
  productdetails:product;
  products:product[];
  constructor() { }

  ngOnInit() {
    this.productcofiguration= "Add"; 
    this.productdetails = {
       name: "",
       code: "",
       manufacturer: "",
       price: 0,
       per: "",
       catergory : {
           value:0,
           name:""
       },
       shortDescription: "",
       description: "",
       media: [""],
       date:new Date().toLocaleDateString()
     };
     this.products = new Array<product>();
  }

  popup(productcofiguration){
    if(productcofiguration== "Close"){
      this.productcofiguration= "Add";
      this.display="none";
      
    }
    if(productcofiguration== "Add"){
      this.productcofiguration= "Close";
      this.display="block";
    }
  }

  closepopup(){
    this.productcofiguration= "Add";
    this.display="none";
  }


  saveProduct(
    // name: string, code: string,
    // manufacturer: string, price: number,
    // per: string, shortDescription: string,
    // description: string, media: string,
  ){
     this.productdetails={
      name: "Jersey",
      code: "ref-09877",
      manufacturer: "Samhasho",
      price: 5,
      per: "short",
      catergory : {
          value:1,
          name:"Clothes"
      },
      shortDescription: "Clothes",
      description: "Clothes",
      media: ["/assets/images/home/product1.jpg"],
      date:new Date().toLocaleDateString()
    }

   ///this.productCreated.emit(new product("","","",  0, "", "","",[""],new Date().toLocaleDateString()));
    if(this.productdetails != null){
      console.log(this.productdetails);
        this.products.push(this.productdetails);
    }
  }

  addProduct(product) {
    this.products.unshift(product);
  }


}


class product{
  name:string;
  code:string;
  manufacturer:string;
  price:number;
  per:string;
  catergory:catergory
  shortDescription:string;
  description:string;
  media:string[];
  date:string;
}

interface catergory{
  value:number;
  name:string;
}
