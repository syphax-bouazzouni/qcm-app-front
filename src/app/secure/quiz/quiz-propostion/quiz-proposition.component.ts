import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {TestService} from '../../../shared/quiz/test.service';
import {BtnRadiusState} from '../../../utils/btn-radius/btn-radius.component';
import {PropositionState} from '../../../interfaces/quiz/proposition-state';

@Component({
  selector: 'app-quiz-proposition',
  templateUrl: './quiz-proposition.component.html',
  styleUrls: ['./quiz-proposition.component.scss']
})
export class QuizPropositionComponent implements OnInit, OnDestroy , OnChanges{

  @HostBinding('class.active')
  isChecked = false;

  @HostBinding('class.success')
  isSuccess = false;

  @HostBinding('class.error')
  isError = false;

  @Input()
  index = 0
  @Input()
  isResponse = false
  @Input()
  state: PropositionState = PropositionState.default
  @Input()
  clearObserver: Observable<void> = {} as Observable<void>
  @Input()
  verifyObserver: Observable<void> = {} as Observable<void>

  @Output()
  checked: EventEmitter<boolean> = new EventEmitter<boolean>()

  @Input()
  blocked = false



  private clearSubscription: Subscription = {} as Subscription
  private verifySubscription: Subscription = {} as Subscription
  private testService: TestService

  constructor() {
    this.testService = new TestService()
  }

  ngOnInit(): void {
    this.clearSubscription = this.clearObserver.subscribe(() => this.clear())
    this.verifySubscription = this.verifyObserver.subscribe(() =>  this.verify())
  }

  ngOnChanges(changes: SimpleChanges): void {
    const state = changes.state
    if (state && state.previousValue !== state.currentValue){
      this.isSuccess = state.currentValue === PropositionState.success
      this.isError = state.currentValue === PropositionState.error
      this.isChecked = state.currentValue === PropositionState.checked
    }
  }

  getAlphabeticIndex(): string{
    return  String.fromCharCode(this.index + 65)
  }

  onClick(): void {
    console.log('blocked ' + this.blocked)
    if (!this.blocked) {
      this.toggle()
      this.checked.emit(this.isChecked)
    }

  }

  clear(): void{
    this.isChecked = false
    this.isError = false
    this.isSuccess = false
    this.blocked = false
  }

  toggle(): void{
    this.isChecked = !this.isChecked
    if (this.isChecked){
      this.state = PropositionState.checked
    }else {
      this.state = PropositionState.default
    }
  }

  verify(): void {
    if (this.isResponse){
      this.isSuccess = true
      this.state = PropositionState.success
    }else if (this.isChecked){
      this.isError = true
      this.state = PropositionState.error
    }
    this.blocked = true
  }

  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe()
    this.verifySubscription.unsubscribe()
  }


  getState(): BtnRadiusState {
    switch (this.state) {
      case PropositionState.success:
        return BtnRadiusState.success
      case PropositionState.checked:
        return BtnRadiusState.active
      case PropositionState.error:
        return BtnRadiusState.error
      default:
        return BtnRadiusState.default
    }
  }
}
