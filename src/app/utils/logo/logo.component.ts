import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input()
  white = true ;
  @Input()
  width = '';
  @Input()
  height = '';

  constructor() { }

  ngOnInit(): void {
  }

}
