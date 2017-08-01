import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { HomeComponent } from '../../container/home/home.component';
import { CartComponent } from "../../container/products/cart/cart.component";
import { BannerComponent } from "../../components/advert/banner.component";
import { LoginComponent } from '../../authentications/login/sign-in.component';
import { RegisterComponent } from '../../authentications/register/register.component';

import * as products from '../../container/products/index';
import { CheckoutComponent } from "app/container/check-out/checkout/checkout.component";
import { UpdateAccountComponent } from "app/container/check-out/update-account/update-account.component";



const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const fallBack: Route = {
    path: '**', component: HomeComponent
}
const routes = [
  {path: '', component: HomeComponent},
  {path: 'products/?', component: products.ProductComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'basket', component: CartComponent},
  {path: 'product', component:products.ProductViewComponent},
  {path: 'advert', component:BannerComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'account_update', component: UpdateAccountComponent},
  fallBack
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouterModule { }
