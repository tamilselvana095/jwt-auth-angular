import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price', 'Images', 'Edit', 'Delete'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService:ImageProcessingService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((x :Product[], i)=> x.map((product:Product)=>this.imageProcessingService.createImages(product)))
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

  public deleteProduct(productId: number) {
    //console.log(productId);
    this.productService.deleteProduct(productId).subscribe(
      (response) => {
        this.getAllProducts();
        // console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images: product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }


}
