import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../models/basket';
import { BasketService } from '../services/basket.service';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OrderTotalsComponent } from '../order-totals/order-totals.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule,AsyncPipe,TableModule,RouterModule,CurrencyPipe,ButtonModule,OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basket$: Observable<IBasket | null>; 
  constructor(private basketservice:BasketService){
    this.basket$=this.basketservice.basket$;
  }

  removeBasketItem(item:IBasketItem)
  {
    this.basketservice.removeItemFromBasket(item);
  }
  incrementItemQuantity(item:IBasketItem)
  {
      this.basketservice.incrementItemQuantity(item);
  }
  decrementItemQuantity(item:IBasketItem)
  {
      this.basketservice.decrementItemQuantity(item);
  }
}
