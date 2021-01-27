import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from '../../../shared/quiz/quiz.service';
import {QuizProgression, QuizProgressionEnum} from '../../../interfaces/quiz/quiz-progression';
import {Quiz} from '../../../interfaces/quiz/quiz';

@Component({
  selector: 'app-quiz-side',
  templateUrl: './quiz-side.component.html',
  styleUrls: ['./quiz-side.component.scss']
})
export class QuizSideComponent implements OnInit {

  progression: QuizProgression = {} as QuizProgression
  quiz: Quiz = {} as Quiz
  currentIndex = 0

  stateCass: Array<string> = []

  constructor(private quizService: QuizService) {

  }

  ngOnInit(): void {
    this.quizService.quizInitObservable.subscribe(x => {
      this.init()
    })
    this.init()
  }

  init(): void {
    this.quiz = this.quizService.quiz
    this.stateCass = this.quizService.stateCass
    console.log('state classes ' + this.stateCass)
    this.quizService.progressionObservable.subscribe(x => {
      this.progression = x
      this.stateCass = this.quizService.stateCass
    })

    this.quizService.nextTestObservable.subscribe((x) => {
      this.currentIndex = x
      console.log('in side go to ' + x)
    })
  }
  goToTest(index: number): void{
    this.quizService.goToTest(index)
  }

  get isSaved(): boolean {
    return this.quizService.isFinished()
  }
  getIndexes(): number[] {
    return [...Array(this.quiz.nbQuestions).keys()]
  }

}
