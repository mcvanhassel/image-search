import { Component } from '@angular/core';

import { MenuItem } from './menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly menuItems: MenuItem[] = [
    { title: 'Welcome', routerLink: '/welcome', icon: 'home' },
    { title: 'Search', routerLink: '/search', icon: 'search' },
  ];
}
