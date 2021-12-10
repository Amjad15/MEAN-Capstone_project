import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/model/product.model';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedProduct : Product;
  products : Product[];
  readonly baseURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  postProduct(obj: any) {
    return this.http.post(this.baseURL+ `/add`, obj);
   
  }
  AddingToCart(obj: any) {
    return this.http.post(this.baseURL+ `/AddingToCart`, obj);
   
  }
  AddingToWishlist(obj: any) {
    return this.http.post(this.baseURL+ `/addingToWishList`, obj);
   
  }
  getProductList( ) {
    return this.http.get(this.baseURL+ `/getAll`  );
  }
  getCartList(username:any) {
    return this.http.post(this.baseURL+ `/getCart` , username);
  }
  getWishList(username:any) {
    return this.http.post(this.baseURL+ `/getWishlist` , username);
  }
  
  putProduct(obj: any , _id : string) {
    return this.http.put(this.baseURL+ `/edit` + `/${_id}`, obj);
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.baseURL+ `/delete` + `/${_id}`);
  }

}
