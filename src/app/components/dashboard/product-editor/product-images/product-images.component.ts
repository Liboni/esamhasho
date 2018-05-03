import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProductMediaResponse } from '../../../../class/product';
import { ActionResult } from '../../../../class/action-result';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {
  productId:String;
  productMedias:ProductMediaResponse[];
  @ViewChild('filesInput') filesInput;

  constructor(private alertService: AlertService,private route: ActivatedRoute,private productService:ProductService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.GetProductMedia(this.productId).subscribe((media)=>{
      this.productMedias = <ProductMediaResponse[]>media.json();
   });
  }

  triggerFile(fileInput:HTMLElement) {
    fileInput.click();
  }
  addMedia(){
  this.spinnerService.show();
  const formData = new FormData();   
    formData.append("media", this.filesInput.nativeElement.files[0]);
    formData.append("productId", this.route.snapshot.paramMap.get('id'));
    this.productService.AddProductMedia(formData).subscribe((result)=>{
      let productMedia =<ProductMediaResponse>result.json();      
       this.productMedias.unshift(productMedia);
       this.spinnerService.hide();       
   });
}

  deleteMedia(media){
    this.spinnerService.show();
    this.productService.DeleteProductMedia(media.Id).subscribe((result)=>{
      let actionResult =<ActionResult>result.json();
       if(actionResult.Success){
       const index: number = this.productMedias.indexOf(media);
       this.productMedias.splice(index,1)
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
