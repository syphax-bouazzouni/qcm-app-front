import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../interfaces/menus/MenuItem';
import {MenuItemList} from '../../interfaces/menus/MenuItemList';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss']
})
export class MenuItemListComponent implements OnInit {

  @Input()
  items: MenuItemList = {} as MenuItemList

  constructor() { }

  ngOnInit(): void {
  }


}
