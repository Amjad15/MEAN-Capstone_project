import { AuthServiceService } from './../auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from 'src/app/shared/model/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})

export class ProductComponent implements OnInit {


  products: Product [] ;
  product : Product;
  cart : any;
  WishList : any;
  errors :string[]=[];

  constructor(private productService : ProductService,
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    //this.resetForm();
    this.productService.getProductList().pipe(map((res)=> res as any )).subscribe((data) => {
      this.products = data;
    },(error) =>{
      this.errors.push(error);
      
    });
    //this.refreshProductList();
  }

  resetForm (form?: FormGroup ){
    form.reset();
    this.productService.selectedProduct = {
      _id!: "",
      name!:"",
      quantity!: null,
      price!: "",
      img!:""
    };
  }

  addingItemTocart(product : any){
   
    this.cart = {
      _id: '',
      productId: product._id,
      name: product.name,
      img: product.img,
      quantity: product.quantity,
      price: product.price,
      username: this.authService.gettoken(),
      status: 1
    };
    this.productService.AddingToCart(this.cart).subscribe((data: any) => {
      this.cart = data;},
      (error) =>{
        this.errors.push(error);
    });

  }
  addingItemToWishlist(product : any){
   
    this.WishList = {
      _id: '',
      productId: product._id,
      name: product.name,
      img: product.img,
      quantity: product.quantity,
      price: product.price,
      username: this.authService.gettoken()
    };
    this.productService.AddingToWishlist(this.WishList).subscribe((data: any) => {
      this.WishList = data;},
      (error) =>{
        this.errors.push(error);
    });

  }

}
