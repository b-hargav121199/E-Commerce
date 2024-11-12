import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../models/basket';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl=environment.baseUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$: Observable<IBasket | null> = this.basketSource.asObservable();
  private basketTotelSource= new BehaviorSubject<IBasketTotals| null>(null);
  basketTotal$=this.basketTotelSource.asObservable();
  constructor(private http:HttpClient) { }

  getBasket(id:string)
  {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
  .pipe(
    map((basket: IBasket) => {
      this.basketSource.next(basket);
      this.calculateTotals()
    })
  );
  }

  setBasket(basket:IBasket)
  {
    this.http.post<IBasket>(this.baseUrl + 'Basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getCurrenctBasketValue()
  {
    return this.basketSource.value;
  }
  AddItemToBasket(item:IProduct,quantity=1)
  {
    const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity);
    let basket=this.getCurrenctBasketValue();
    if(basket===null)
    {
      basket=this.createBasket();
    }
    basket.basketItems=this.addOrUpdateItem(basket.basketItems,itemToAdd,quantity);
    this.setBasket(basket);
  }
  addOrUpdateItem(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
  
    const index=basketItems.findIndex(i=>i.id==itemToAdd.id)
    if(index===-1)
    {
      itemToAdd.quantity=quantity;
      basketItems.push(itemToAdd)
    }
    else{
      basketItems[index].quantity += quantity
    }
    return basketItems

  }
  private createBasket(): IBasket 
  {
    const basket= new Basket()
    localStorage.setItem('basket_id',basket.id)
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType
    };
  }
  private calculateTotals(){
    const basket=this.getCurrenctBasketValue();
    const shipping=0;
    const subtotal=Number(basket?.basketItems.reduce((a,b)=>(b.price*b.quantity)+ a,0));
    const total=subtotal+shipping;
    this.basketTotelSource.next({shipping,total,subtotal})

  }
  incrementItemQuantity(item:IBasketItem)
  {
    var basket=this.getCurrenctBasketValue();
    const foundItemIndex= Number(basket?.basketItems.findIndex(x=>x.id===item.id));
    const SelectedItem = basket?.basketItems[foundItemIndex];
    if (SelectedItem) {
      SelectedItem.quantity++;
    }
    this.setBasket(basket!);

  }
  decrementItemQuantity(item:IBasketItem)
  {
    var basket=this.getCurrenctBasketValue();
    const foundItemIndex= Number(basket?.basketItems.findIndex(x=>x.id===item.id));
    const SelectedItem = basket?.basketItems[foundItemIndex];
    if(SelectedItem )
    {
      SelectedItem.quantity--;
      if(SelectedItem.quantity>1)
      {
        this.setBasket(basket!);
   
      }
      else
      {
        this.removeItemFromBasket(item)
      }
    }
    else
    {
        this.removeItemFromBasket(item)
    }
    this.setBasket(basket!);

  }
  removeItemFromBasket(item: IBasketItem) {
   const basket=this.getCurrenctBasketValue();
   if(basket?.basketItems.some(x=>x.id===item.id))
   {
    basket.basketItems=basket.basketItems.filter(i=>i.id !=item.id);
    if(basket.basketItems.length>0)
    {
      this.setBasket(basket!)
    }
    else
    {
      this.deleteBasket(basket)
    }
   }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl+ 'Basket?id='+ basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotelSource.next(null)
      localStorage.removeItem('basket_id')
    },err=>{
      console.log(err);
    })
  }
}
