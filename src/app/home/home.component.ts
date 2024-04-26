import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productDetails: Product[] = [];

  pageNumber:number=0;
  showLoadButton=false;

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingService,
              private router:Router
  ){}

  ngOnInit(): void {

    // this.productService.getProductDetails(true,3).subscribe((data)=>{
    //   console.log(data);
    // })
    
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          if(response.length == 12){
            this.showLoadButton=true
          }else{
            this.showLoadButton=false;
          }
          response.forEach(p=>this.productDetails.push(p));
          //this.productDetails = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      );
  }

  
  public loadMoreProduct(){
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }


  showProductDetails(productId:number){
    this.router.navigate(['/productViewDetails',{productId:productId}])
  }


}
