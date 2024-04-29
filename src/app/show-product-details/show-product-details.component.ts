import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  pageNumber:number=0;
  showTable=false;
  showLoadMoreProductButton=false;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  public getAllProducts(searchKeyword:string="") {

    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchKeyword)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (response: Product[]) => {
          console.log(response);
          //this.productDetails = response;

          response.forEach(p=>this.productDetails.push(p));
          this.showTable=true

          if(response.length === 12){
            this.showLoadMoreProductButton=true;
          }else{
            this.showLoadMoreProductButton=false;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error)
        }
      );
  }

  searchByKeyword(searchKeyword){
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword)
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
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  public editProductDetails(productId: number) {
    // console.log(productId);
    this.router.navigate(['/addNewProduct', {productId:productId}])

  }

  loadMoreProduct(){
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }

  

}
