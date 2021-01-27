import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input()
  label = '';
  @Input()
  name = '';
  @Input()
  type = 'text'

  formGroup = {} as FormGroup
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup
  }

}
