import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../interfaces/menus/MenuItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input()
  item: MenuItem = {} as MenuItem

  constructor() { }

  ngOnInit(): void {
  }

}
