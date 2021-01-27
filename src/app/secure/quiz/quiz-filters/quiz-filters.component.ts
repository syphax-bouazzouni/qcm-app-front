import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-filters',
  templateUrl: './quiz-filters.component.html',
  styleUrls: ['./quiz-filters.component.scss']
})
export class QuizFiltersComponent implements OnInit {
  tagsIgnored = false;
  nbQuestions = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
