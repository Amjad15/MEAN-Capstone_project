import { ProductService } from './shared/service/product.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'webStore';

  getCart
  isAuthenticated = false;
  CartItems : any[];
  Counter = 0;
  errors: any;
  show = false;

  constructor( 
    private productService : ProductService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
    ){
      this.getCartItems();
    }
  ngOnInit(): void {
   if ( this.authService.gettoken()){
    this.isAuthenticated = true;
     this.show =true;
   }
    this.getCartItems();
  }
  getCartItems(){
      this.productService.getCartList({username : this.authService.gettoken()}).pipe(map((res)=> res as any )).subscribe((data) => {
        this.CartItems= data;
        this.Counter= this.CartItems.length;
      },(error) =>{
        this.errors.push(error);
        
      });

  }
  async logout(): Promise<void> {
    localStorage.clear();
    this.isAuthenticated=false;
    this.router.navigate(['/login']);
    // todo
  }
}
