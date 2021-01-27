import {Component, Input, OnInit} from '@angular/core';


export enum BtnRadiusState {
  'default', 'active', 'success', 'error'
}

@Component({
  selector: 'app-btn-radius',
  templateUrl: './btn-radius.component.html',
  styleUrls: ['./btn-radius.component.scss']
})
export class BtnRadiusComponent implements OnInit {

  @Input()
  text = ''
  @Input()
  state: BtnRadiusState = BtnRadiusState.default
  constructor() { }

  ngOnInit(): void {
  }

  getClass(): string {
    switch (this.state){
      case BtnRadiusState.error:
        return 'error'
      case BtnRadiusState.success:
        return 'success'
      case BtnRadiusState.active:
        return 'active'
      default:
        return ''
    }
  }
}
