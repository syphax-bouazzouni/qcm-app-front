import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuizTimerComponent} from '../quiz-timer/quiz-timer.component';
import {QuizService} from '../../../shared/quiz/quiz.service';
import {QuizTestComponent} from '../quiz-test/quiz-test.component';
import {Quiz} from '../../../interfaces/quiz/quiz';
import {QuizProgressionEnum} from '../../../interfaces/quiz/quiz-progression';
import {TestResult} from '../../../interfaces/quiz/TestResult';
import {Router} from '@angular/router';
import {TestType} from '../../../interfaces/quiz/test';
import {TimerService} from '../../../shared/quiz/timer.service';
import {AlertifyService} from '../../../shared/utils/alertify.service';


@Component({
  selector: 'app-quiz-main',
  templateUrl: './quiz-main.component.html',
  styleUrls: ['./quiz-main.component.scss']
})
export class QuizMainComponent implements OnInit, OnDestroy {

  @ViewChild(QuizTestComponent)
  test: QuizTestComponent = {} as QuizTestComponent

  responded = false
  quiz: Quiz = {} as Quiz
  progression: QuizProgressionEnum = QuizProgressionEnum.none
  currentTest: TestResult = {} as TestResult;


  private audioWrong = new Audio('/assets/audio/wrong_answer.webm')
  private audioCorrect = new Audio('/assets/audio/correct_answer.webm')

  isEnd = false;

  constructor(private quizService: QuizService,
              private router: Router,
              private timer: TimerService,
              private alert: AlertifyService) {

  }

  ngOnInit(): void {
    this.quiz = this.quizService.getQuiz()
    this.currentTest = this.quizService.getCurrentTest()

    this.quizService.quizInitObservable.subscribe(x => {
      console.log('init observable')
      this.init()
    })

    if (this.quizService.saver.isSavedQuiz) {
      this.timer.setTimer(this.currentTest.timer)
      if (this.quizService.isFinished()){
        this.initTimerSubscribe()
      }else{
        this.continueAlert()
      }
    }else{
      this.initTimerSubscribe()
    }

  }

  init(): void {
    this.quizService.nextTestObservable.subscribe((x) => {
      if (x !== this.quizService.currentIndex) {
        this.onTestUpdate('next event')
      }
      this.quizService.currentIndex = x
      console.log('go to ' + this.quizService.currentIndex)
      this.currentTest = this.quizService.getCurrentTest()

      this.responded = this.currentTest.state !== QuizProgressionEnum.none
      this.isEnd = this.quizService.isEnd()
      this.progression = this.currentTest.state

    })
  }

  private initTimerSubscribe(): void {
    this.initTimer()
    this.quizService.nextTestObservable.subscribe((x) => {
      this.initTimer()
    })
  }

  initTimer(): void {
    if (!this.responded) {
      this.timer.startTimer(this.currentTest.timer)
    } else if (this.responded) {
      this.timer.setTimer(this.currentTest.timer)
    }
  }

  private continueAlert(): void{
    this.alert.confirm('Confirmation de la suite session',
      'Vous voulez continuer votre session précédente',
      () => {
        this.initTimerSubscribe()
        this.alert.message('suite de la session')
      },
      () => {
        this.restart()
        this.initTimerSubscribe()
        this.alert.message('nouvelle session')
      }
    )
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (!this.quizService.isFinished()){
      this.onTestUpdate('destroy')
    }
  }


  updateProgression(result: QuizProgressionEnum): void {
    switch (result) {
      case QuizProgressionEnum.success:
        this.audioCorrect.play()
        break;
      default:
        this.audioWrong.play()
    }

    this.quizService.updateProgress(result)

  }

  processTest(): void {

    if (this.responded) {
      if (this.isEnd) {
        this.goToResultPage()
      } else {
        this.quizService.nextTest()
      }
    } else {
     this.verify()
    }
    this.isEnd = this.quizService.isEnd()
    console.log('isEnd ? ' + this.isEnd)
    console.log('isResponded ? ' + this.responded)

  }

  private verify(): void{
    this.responded = true
    this.progression = this.test.verify()
    this.updateProgression(this.progression)
    this.timer.pauseTimer()
    this.onTestUpdate('verify')
  }

  clear(): void {
    if (!this.responded) {
      this.test.clear()
    }
  }

  onTestUpdate(s: string): void {
    console.log('save in ' + s)
    const savedTest = this.quizService.getCurrentTest()

    if (this.progression !== savedTest.state) {
      savedTest.state = this.progression
    }

    if (this.test.getCheckedResponses && this.timer.getTimer) {
      savedTest.timer = this.timer.getTimer()
      savedTest.propositionsState = this.test.getCheckedResponses()
    }
    this.quizService.saveTest(savedTest, this.quizService.currentIndex)
    this.quizService.saver.saveQuiz()

  }

  pause(): void {
    if (!this.responded) {
      this.timer.toggleTimer()
    }
  }

  finish(): void {
    this.quizService.finish()
    this.goToResultPage()
  }

  private goToResultPage(): void {
    this.router.navigate(['quiz/result'])
  }

  get questionType(): string {
    return this.currentTest.test.type === TestType.QCU ? 'QCU' : 'QCM'
  }

  get currentIndex(): number {
    return this.quizService.currentIndex
  }

  restart(): void {
    this.quizService.saver.clearQuiz()
    this.quiz = this.quizService.getQuiz()
    this.initTimer()
  }
}
