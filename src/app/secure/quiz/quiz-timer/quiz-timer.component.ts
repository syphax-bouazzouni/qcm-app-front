import {Component, Input, OnInit} from '@angular/core';
import {countUpTimerConfigModel, CountupTimerService, timerTexts} from 'ngx-timer';
import {TimerService} from '../../../shared/quiz/timer.service';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss']
})
export class QuizTimerComponent implements OnInit {

  testConfig: countUpTimerConfigModel = {};

  constructor(private timerService: TimerService) {

  }

  ngOnInit(): void {
    this.testConfig = new countUpTimerConfigModel();

    // custom class
    this.testConfig.timerClass = 'test_Timer_class';

    // timer text values
    this.testConfig.timerTexts = new timerTexts();
    this.testConfig.timerTexts.hourText = ' :'
    this.testConfig.timerTexts.minuteText = ' :'
    this.testConfig.timerTexts.secondsText = ' '

  }


  isLate(): boolean {
      return  this.timerService.isLate()
  }
}
