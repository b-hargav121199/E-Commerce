import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../models/basket';
import { BasketService } from '../services/basket.service';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [AsyncPipe,CommonModule,CurrencyPipe,ButtonModule,RouterModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {
baskettotal$!:Observable<IBasketTotals |null>;
constructor(private basketService:BasketService){
  this.baskettotal$=this.basketService.basketTotal$;
}
}
