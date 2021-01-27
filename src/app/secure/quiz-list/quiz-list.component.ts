import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  constructor(private router: ActivatedRoute, private title: Title) {
    this.title.setTitle(this.router.snapshot.params.id)
  }

  ngOnInit(): void {

  }

  openQuiz(): void {
    const url = 'quiz'
    window.open(url)
  }
}
