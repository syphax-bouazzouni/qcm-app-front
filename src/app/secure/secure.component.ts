import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MenuItemList} from '../interfaces/menus/MenuItemList';
import {menuData} from '../data/menu.data';
import {filter} from 'rxjs/operators';
import {PathService} from '../shared/path.service';


@Component({
  selector: 'app-app',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {

  menuItems: MenuItemList[]

  constructor(private router: Router) {
    this.menuItems = menuData
  }

  ngOnInit(): void {
  }


}
