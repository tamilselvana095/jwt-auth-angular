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
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          this.productDetails = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      );
  }

  showProductDetails(productId:number){
    this.router.navigate(['/productViewDetails',{productId:productId}])
  }


}
