import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss']
})
export class QuizAppComponent implements OnInit {

  paused = false
  constructor() { }

  ngOnInit(): void {

  }

  onPause(): void {
    this.paused = !this.paused
  }
}
