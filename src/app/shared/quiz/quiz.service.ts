import {Injectable} from '@angular/core';
import {QuizData} from '../../data/quiz.data';
import {Quiz} from '../../interfaces/quiz/quiz';
import {QuizProgression, QuizProgressionEnum} from '../../interfaces/quiz/quiz-progression';
import {BehaviorSubject, Observable} from 'rxjs';
import {TestResult} from '../../interfaces/quiz/TestResult';
import {QuizResult} from '../../interfaces/quiz/QuizResult';
import {QuizResultService} from './quiz-result.service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly startProgression = {success: 0, error: 0, notRespond: 0, rest: 0}


  private $saver: QuizResultService = new QuizResultService()

  private quizInitSubject: BehaviorSubject<QuizResult> = new BehaviorSubject<QuizResult>({} as QuizResult)
  quizInitObservable: Observable<QuizResult> = this.quizInitSubject.asObservable()

  private progressionSubject: BehaviorSubject<QuizProgression> | null = null
  progressionObservable: Observable<QuizProgression>  = new Observable<QuizProgression>()

  private nextTestSubject: BehaviorSubject<number> | null = null
  nextTestObservable: Observable<number> = new Observable<number>()


  stateCass: Array<string> = []

  constructor() {

  }



  getQuiz(): Quiz {

    this.saver.getSavedQuiz()

    if (!this.quizResult.quiz) {
      this.quiz = QuizData
      this.progression = this.startProgression
      this.progression.rest = this.quiz.nbQuestions
      this.quizResult.testCache = []
      this.quizResult.saved = false
      this.currentIndex = 0
      console.log(' get new quiz')
    }else {
      console.log(' get saved quiz ' + this.quizResult.quiz.id)
    }

    this.stateCass = this.getTestStates()
    this.nextTestSubject = new BehaviorSubject<number>(this.currentIndex)
    this.nextTestObservable = this.nextTestSubject.asObservable()

    this.progressionSubject = new BehaviorSubject<QuizProgression>(this.progression)
    this.progressionObservable = this.progressionSubject.asObservable()

    this.quizInitSubject.next(this.quizResult)

    return this.quiz;
  }


  getCurrentTest(): TestResult {
    const test = this.getSavedTest(this.currentIndex)
    if (!test) {
      return {
        test: this.quiz.tests[this.currentIndex],
        state: (this.isFinished() ? QuizProgressionEnum.notRespond : QuizProgressionEnum.none),
        timer: 0,
        propositionsState: Array(this.quiz.tests[this.currentIndex].propositions.length).fill(false)
      }
    } else {
      return test
    }
  }

  updateProgress(type: QuizProgressionEnum): void {
    if (this.progression.rest > 0) {
      this.progression.rest--;
      switch (type) {
        case QuizProgressionEnum.error:
          this.progression.error++
          break
        case QuizProgressionEnum.notRespond:
          this.progression.notRespond++
          break
        case QuizProgressionEnum.success:
          this.progression.success++
          break
      }
      this.stateCass[this.currentIndex] = this.getStateClass(type)
      if (this.progressionSubject !== null){
        this.progressionSubject.next(this.progression)
      }
    }
  }


  saveTest(testResult: TestResult, index?: number): TestResult {
    if (index !== undefined && this.quizResult.testCache[index] !== undefined) {
      this.quizResult.testCache[index] = testResult
    } else if (index === undefined) {
      this.quizResult.testCache.push(testResult)
    }else {
      this.quizResult.testCache[index] = testResult
    }
    return testResult
  }

  getSavedTest(index: number): TestResult {
    return this.quizResult.testCache[index]
  }

  goToTest(index: number): void {
    if (index >= 0 && index < this.quiz.nbQuestions) {
      if (this.nextTestSubject !== null) {
        this.nextTestSubject.next(index)
      }
    }
  }

  nextTest(): void {
    this.goToTest(this.currentIndex + 1)
  }

  isEnd(): boolean {
    return this.$saver.quizResult.progression.rest === 0
  }
  isFinished(): boolean{
    return this.saver.quizResult.saved
  }

  private getTestStates(): string[] {
    const out = new Array<string>(this.quiz.nbQuestions)

    for (let i = 0 ; i < this.quiz.nbQuestions ; i++){
      if (this.quizResult.testCache[i]){
        out[i] = (this.getStateClass(this.quizResult.testCache[i].state))
      }else if (this.isFinished()){
        out[i] = 'not-responded'
      }
    }
    return out
  }

  get currentIndex(): number {
    return this.quizResult.currentTest
  }

  set currentIndex(index: number) {
    this.quizResult.currentTest = index
    this.$saver.saveQuiz()
  }

  get progression(): QuizProgression {
    return this.quizResult.progression
  }

  set progression(p) {
    this.quizResult.progression = p
  }

  get quiz(): Quiz {
    return this.quizResult.quiz
  }

  set quiz(q) {
    this.quizResult.quiz = q
  }

  private get quizResult(): QuizResult {
   return this.$saver.quizResult
  }


  get saver(): QuizResultService{
    return this.$saver
  }

  private getStateClass(result: QuizProgressionEnum): string {
    switch (result) {
      case QuizProgressionEnum.success:
        return 'success'
      case QuizProgressionEnum.notRespond:
        return 'not-responded'
      case QuizProgressionEnum.error:
        return 'error'
      default:
        if (this.isFinished()){
          return 'not-responded'
        }else {
          return ''
        }
    }
  }


  finish(): void {
    const testCache = this.quizResult.testCache
    this.quizResult.saved = true
    this.quizResult.testCache.forEach( (x , i ) => {
      if (x.state === QuizProgressionEnum.none){
        testCache[i].state = QuizProgressionEnum.notRespond
      }
    })
    this.quizResult.testCache = testCache
    this.progression.notRespond = this.progression.rest
    this.progression.rest = 0
    this.saver.saveQuiz()
  }
}
