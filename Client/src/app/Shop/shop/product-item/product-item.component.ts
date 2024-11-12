import { Component, Input, input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IProduct } from '../../../models/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BasketService } from '../../../services/basket.service';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,CurrencyPipe,TableModule, TagModule,MessagesModule,RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
@Input() Product!:IProduct[];
messages = [
  { severity: 'info', summary: 'info:', detail: 'Product is not found for selected filter' }
];
constructor(private basketService:BasketService){}
ngOnInit(){
}
AddItemtoBasket(product:IProduct)
{
  this.basketService.AddItemToBasket(product)
}
}
