import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CardModule, CurrencyPipe, ButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: IProduct;
  quantity = 1;
  constructor(private shopService: ShopService, private activatedroute: ActivatedRoute, private basketService: BasketService) {

  }
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getproduct(Number(this.activatedroute.snapshot.paramMap.get('id'))).subscribe(response => {
      this.product = response;
    }, error => {
      console.log(error)
    })
  }
  addItemToBasket()
  {
    this.basketService.AddItemToBasket(this.product,this.quantity)
  }
  incrementQuantity()
  {
    this.quantity++;
  }
  decrementQuantity()
  {
    if(this.quantity>1)
    {
      this.quantity--;
 
    }
  }
}
