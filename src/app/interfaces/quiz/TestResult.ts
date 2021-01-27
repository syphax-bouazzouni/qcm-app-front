import {Test} from './test';
import {QuizProgressionEnum} from './quiz-progression';

export interface TestResult{
  test: Test
  propositionsState: boolean[],
  timer: number,
  state: QuizProgressionEnum
}
