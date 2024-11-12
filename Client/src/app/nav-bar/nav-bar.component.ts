import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BasketService } from '../services/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../models/basket';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenubarModule,ButtonModule,CommonModule,AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent  implements OnInit {
  basket$: Observable<IBasket | null>; 
  constructor(private basketservices:BasketService)
  {
    this.basket$ = this.basketservices.basket$;
  }
  NavBarItem: MenuItem[] | undefined;
  ngOnInit(): void {
   this.NavBarItem=[
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink:"/",

  },
  {
      label: 'SHOPE',
      icon: 'pi pi-star',
      routerLink :"shop",


  },
  {
    label: 'ERROR',
    icon: 'pi pi-envelope',
    routerLink:'test-error'


  }

   ]
 
  }

}
