import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {NgxSpinnerModule} from 'ngx-spinner'
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,ShopComponent,ToastModule,ProgressSpinnerModule,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private basketService:BasketService)
  {}
  ngOnInit(): void {
    const basketId=localStorage.getItem("basket_id");
    if(basketId)
    {
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log("initialised basket");
      },err=>{
        console.log(err);
      })
    }
  }
  

}
