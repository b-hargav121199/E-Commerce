import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { ProductDetailsComponent } from './Shop/product-details/product-details.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'shop',loadComponent:()=>{return import('./Shop/shop/shop.component').then(b => b.ShopComponent);},},
    {path:'shop/:id',component:ProductDetailsComponent},
    {path:'**',redirectTo:'',pathMatch:'full'}




];
