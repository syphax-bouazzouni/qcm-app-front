import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {TestService} from '../../../shared/quiz/test.service';
import {QuizProgressionEnum} from '../../../interfaces/quiz/quiz-progression';
import {TestResult} from '../../../interfaces/quiz/TestResult';
import {PropositionState} from '../../../interfaces/quiz/proposition-state';
import {TestType} from '../../../interfaces/quiz/test';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnInit, OnChanges {

  @Input()
  test: TestResult = {} as TestResult
  @Output()
  updated: EventEmitter<void> = new EventEmitter()

  clearEvent: Subject<void> = new Subject<void>();
  verifyEvent: Subject<void> = new Subject<void>();

  private testService: TestService

  constructor() {
    this.testService = new TestService()
  }

  ngOnInit(): void {

  }

  clear(): void {
    this.clearEvent.next()
  }

  verify(): QuizProgressionEnum {
    this.verifyEvent.next()
    return this.testService.verifyTest()
  }

  getCheckedResponses(): boolean[] {
    return this.testService.propositionsState
  }

  updateCheckedResponses(index: number, state: boolean): void {
    const old = this.getCheckedResponses()[index]
    if (old !== state) {
      this.testService.updatePropositionState(index, state)
      this.updated.emit()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changedProp = changes.test
    // console.log('test  changed')
    this.testService.setTest(changedProp.currentValue)
  }

  getPropositionState(index: number, isResponse: boolean): PropositionState {
    const isChecked = this.isPropositionChecked(index)
    let state;

    if (this.isStateNone() && isChecked) {
        state = PropositionState.checked
    } else if (!this.isStateNone() && isResponse) {
        state = PropositionState.success
    } else if (!this.isStateNone() && isChecked){
        state = PropositionState.error
    }else {
      state = PropositionState.default
    }

    return state
  }

  private isPropositionChecked(index: number): boolean {
    return this.getCheckedResponses()[index]
  }

  isBlocked(index: number): boolean {
    if (this.isMaxResponse()) {
      return !this.isPropositionChecked(index)
    } else {
      return !this.isStateNone()
    }

  }

  isMaxResponse(): boolean {
    return this.test.test.type === TestType.QCU && this.getNbChecked() === 1
  }

  isStateNone(): boolean {
    return this.test.state === QuizProgressionEnum.none
  }

  private getNbChecked(): number {
    return this.getCheckedResponses().filter(x => x).length
  }
}

