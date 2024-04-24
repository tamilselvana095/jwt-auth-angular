import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})

export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  public placeOrder(orderForm: NgForm) {

  }

  ngOnInit(): void {

    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );

    console.log("Product Details : "+this.productDetails)
    console.log("Order Details : "+this.orderDetails);

  
   
  }

}
