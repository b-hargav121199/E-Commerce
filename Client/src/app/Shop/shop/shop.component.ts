import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { IProduct } from '../../models/product';
import { ShopService } from '../shop.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {  FormGroup, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ProductItemComponent } from './product-item/product-item.component';
import { SplitterModule } from 'primeng/splitter';
import { Ibrand } from '../../models/brand';
import { IType } from '../../models/prodycttype';


interface ShortIteams {
  name: string,
  code: string
}
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ButtonModule,CommonModule,FormsModule,ListboxModule,InputTextModule,FloatLabelModule,DropdownModule,ProductItemComponent,SplitterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ShopComponent implements OnInit {
@ViewChild('search',{static:true}) searchTerm!:ElementRef;
products!:IProduct[];
brands!:Ibrand[];
types!:IType[];

ShortIteams!:ShortIteams[];
SelectshortIteams!:string;
SearchItems!: string;
formGroup: FormGroup | undefined;

selectedBrand!: number;
selectedType!: number;

value: string | undefined;
constructor(private shopService:ShopService){}
ngOnInit(): void {

  this.getProducts();
  this.getBrands();
  this.getTypes()

this.ShortIteams=[
  { name: 'Alphabatical', code: '1' },
  { name: "Price: Low to High", code: '2' },
  { name:   "Price : Hight to Low", code: '3' }
  

]
}
getProducts()
{
  this.shopService.getProduct(this.selectedBrand,this.selectedType,this.SearchItems).subscribe(response=>{
    this.products=response??[];
  },error=>{
    console.log(error);
  }) 
}
getBrands(){
  this.shopService.getBrands().subscribe(response=>{
    this.brands =[{id:0,name:"All"},...response];
  },error=>{
    console.log(error);
  }) 
}

getTypes(){
  this.shopService.getTypes().subscribe(response=>{
    this.types =[{id:0,name:"All"},...response];
  },error=>{
    console.log(error);
  }) 
}

onListboxChangeTypeid(data:any)
{
  this.selectedType=data.value.id
  this.getProducts()
}
onListboxChangeBrandid(data:any)
{
  this.selectedBrand=data.value.id
  this.getProducts()
}
onsearch()
{
this.SearchItems =this.searchTerm.nativeElement.value;
this.getProducts()
}
onreset()
{
  this.searchTerm.nativeElement.value=null;
  this.SearchItems =this.searchTerm.nativeElement.value;
  this.getProducts()
}
}

