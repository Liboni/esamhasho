import { Component, OnInit } from '@angular/core';
import { CatergoryService } from '../../services/catergory.service'
import { Catergory } from '../../class/catergory'
import { Product, CreateProductResponse } from '../../class/product';
import { ProductService } from '../../services/product.service';
import { SearchProductRequest} from '../../class/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  catergoryId:number;
  catergories:Catergory[];
  catergory:Catergory;
  products:Product[];
  productsFeature:Product[];
  product:Product;
  p :any;
  public search:any;
  searchProductRequest:SearchProductRequest;

  constructor(private productService:ProductService,private catergoryService:CatergoryService) {
    this.catergory= new Catergory;
    this.product= new Product;
    this.searchProductRequest= new SearchProductRequest;
   }

  ngOnInit() {
    this.catergoryId= 0
    this.loadProducts(this.catergoryId)
    this.catergoryService.GetAllCatergories().subscribe((catergories)=>{    
      this.catergories = <Catergory[]>catergories.json();
   });
   this.productService.GetAllProducts().subscribe((products)=>{
    this.products= <Product[]>products.json();
   });  
  }
  

  loadProducts(catergoryId){
    this.catergoryId=catergoryId;
    this.searchProductRequest = {
      Catergory :this.catergoryId,
      Search:""
  }
  this.productService.SearchProduct(this.searchProductRequest).subscribe((products)=>{
    this.productsFeature= <Product[]>products.json();
   });
  }
}





