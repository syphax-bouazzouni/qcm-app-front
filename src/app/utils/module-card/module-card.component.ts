import {Component, Input, OnInit} from '@angular/core';
import {Module} from '../../interfaces/module';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent implements OnInit {

  @Input()
  module: Module = {} as Module
  constructor() { }

  ngOnInit(): void {
  }

}
