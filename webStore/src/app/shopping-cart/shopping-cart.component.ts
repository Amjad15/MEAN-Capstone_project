import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart:Array<any> = [];
  checkoutOrder:Array<any> = [];
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  invalidDeleteItem = false;
  updateErrorMsg = "";
  checkoutComplete = false;
  errors: any;

  constructor(
    private productService : ProductService,
    private authService: AuthServiceService
  ) {

   }

  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(){
    this.productService.getCartList({username : this.authService.gettoken()}).pipe(map((res)=> res as any )).subscribe((data) => {
      this.shoppingCart= data;
    },(error) =>{
      this.errors.push(error);
      
    });

}
submitCart(){
  let userid =  this.authService.gettoken();
  if(localStorage.getItem('shoppingCart') && userid !== null){
    this.shoppingCart=JSON.parse(localStorage['shoppingCart']);
  }
  else{
    return;
  }
  for(let i = 0; i < this.shoppingCart.length; i++){
    let orderObject = {productId: this.shoppingCart[i].productId, quantity: this.shoppingCart[i].quantity}
    this.checkoutOrder.push(orderObject);
  }
  //this.ordersService.checkout({userId:userid, cart:this.checkoutOrder});
  //localStorage.removeItem("shoppingCart");
}

}
