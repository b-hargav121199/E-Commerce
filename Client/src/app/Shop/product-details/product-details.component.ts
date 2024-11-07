import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CardModule,CurrencyPipe,ButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

product!:IProduct;
constructor(private shopService:ShopService,private activatedroute: ActivatedRoute){

}
  ngOnInit(): void {
  this.loadProduct();
  }
loadProduct()
{
  this.shopService.getproduct(Number(this.activatedroute.snapshot.paramMap.get('id'))).subscribe(response=>{
    this.product =response;
  },error=>{
    console.log(error)
  })
}
}
