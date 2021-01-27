import { Injectable } from '@angular/core';
import {MenuItem} from '../interfaces/menus/MenuItem';
import {menuData} from '../data/menu.data';
import {ActivatedRoute} from '@angular/router';
import {PathElement} from '../interfaces/path-element';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private list: Array<PathElement> = []
  private readonly first: MenuItem
  constructor() {
    this.first = menuData[0].header
  }

  add(route: string, url: string): void {
    const i = this.list.findIndex(l => l.label === route)
    if (i > -1){
      console.log('slice')
      this.list.splice(i + 1, this.list.length)
    }else{
      this.list.push({label: route, link: url})
    }
  }

  getLast(): PathElement{
    const out: PathElement = this.list.pop() as PathElement
    this.list.push(out)
    return out
  }

  getListWithLast(): PathElement[]{
    return this.list.slice(0, this.list.length - 1)
  }
  getFirst(): MenuItem{
    return this.first;
  }

  clear(): void{
    this.list = []
  }

}
