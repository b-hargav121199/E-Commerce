import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Ibrand } from '../models/brand';
import { IType } from '../models/prodycttype';
import {map} from 'rxjs/operators'
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }
  getProduct(brandid?:number,typeid?:number,searchitems?:string)
  {
    const urlSearchParams = new URLSearchParams();
    if(brandid){
      urlSearchParams.append('brandid',brandid.toString())
    }
    if(typeid){
      urlSearchParams.append('typeid',typeid.toString())
    }
    if(searchitems)
    {
      urlSearchParams.append('search',searchitems.toString())
    }
    return this.http.get<IProduct[]>(`${this.baseUrl }Products?${urlSearchParams.toString()}`)
  }
  getBrands(){
    return this.http.get<Ibrand[]>(this.baseUrl+"Products/ProductBrands")
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+"Products/ProductTypes")
  }
  getproduct(id:number){
    return this.http.get<IProduct>(this.baseUrl+ 'products/' + id)
  }
}
