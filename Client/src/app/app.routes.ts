import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { ProductDetailsComponent } from './Shop/product-details/product-details.component';
import { TestComponent } from './test/test.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'shop',loadComponent:()=>{return import('./Shop/shop/shop.component').then(b => b.ShopComponent);},},
    {path:'basket',loadComponent:()=>{return import('./basket/basket.component').then(b => b.BasketComponent);},},
    {path:'shop/:id',component:ProductDetailsComponent},
    {path:'test-error',component:TestComponent},
    {path:'server-error',component:ServerErrorComponent},
    {path:'not-found',component:NotFoundComponent},
    {path:'Checkout',loadComponent:()=>{return import('./checkout/checkout.component').then(b => b.CheckoutComponent);}}, 
    {path:'**',redirectTo:'',pathMatch:'full'}




];
