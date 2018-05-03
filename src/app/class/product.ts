export class Product {
        
        public ProductId:number;

        public Name:string;
        
        public Code:string;
        
        public Manufacturer:string;
        
        public Price:number;
        
        public Per:string;

        public IsActive:Boolean;
       
        public Catergory:string;
        
        public CatergoryId:number;
        
        public ShortDescription:string;
        
        public Description:string;
       
        public MediaSource:string;
        
        public CreatedDate:string;
        
        public Views:number;
       
        public UserId:string;
        
        public IsDeleted:Boolean;
        
        public ModifiedDate:string;  
        
        public IsMain:Boolean;

}


export class CreateProductResponse {

      public ProductId:number;
  
      public MediaSource:string;
  
      public Catergory:string
  
      public DateCreated:string
  }


  export class UpdateProductRequest {

      public ProductId:number;

      public Name:string;

      public Manufacturer:string;
      
      public Price:number;
      
      public Per:string;
      
      public Catergory:number;
      
      public ShortDescription:string;
      
      public Description:string;    
 
  }

  export class ProductMediaResponse {

    public Id:number;

    public MediaSource:string;   
}


  export class SearchProductRequest {

      public Catergory:number;   
      
      public Search:string;    
 
  }
