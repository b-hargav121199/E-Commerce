import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenubarModule,ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent  implements OnInit {
  NavBarItem: MenuItem[] | undefined;
  ngOnInit(): void {
   this.NavBarItem=[
    {
      label: 'Home',
      icon: 'pi pi-home'
  },
  {
      label: 'SHOPE',
      icon: 'pi pi-star'
  },
  {
    label: 'CONTACT',
    icon: 'pi pi-envelope'
  }

   ]
  }

}
