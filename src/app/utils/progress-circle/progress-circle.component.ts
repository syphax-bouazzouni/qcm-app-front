import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {

  @Input()
  value = 0

  constructor() { }

  ngOnInit(): void {
  }


}
