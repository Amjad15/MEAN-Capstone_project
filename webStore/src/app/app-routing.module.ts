import { ProductComponent } from './product/product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '',component: HomeComponent
  },
  {path: 'login',component: LoginComponent
  },
  {path: 'register',component: RegisterComponent
  },
  {path: 'home',component: HomeComponent
  },
  {path: 'admin/dashboard',component: AdminDashboardComponent
  },
  {path: 'product',component: ProductComponent
  },{path: 'products',component: ProductsComponent
},
  {path: 'user',component: UsersComponent
  },
  {path: 'shoppingCart',component: ShoppingCartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
