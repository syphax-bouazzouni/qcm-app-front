import { Component, OnInit } from '@angular/core';
import {QuizReultText} from '../../../data/quiz-result.data';
import {QuizService} from '../../../shared/quiz/quiz.service';
import {QuizProgression} from '../../../interfaces/quiz/quiz-progression';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  progression: QuizProgression  = {} as QuizProgression
  nbQuestions = 0
  success = false

  constructor(private quizService: QuizService, private router: Router) {

  }

  ngOnInit(): void {
    const q = this.quizService.saver.getSavedQuiz()
    this.progression = q.progression
    this.nbQuestions = q.quiz.nbQuestions
    this.success =  this.progression.success >= (this.progression.error + this.progression.rest)
  }


  get headerText(): string {
    if (this.success){
      return  QuizReultText.success
    }else {
      return QuizReultText.error
    }
  }


}
