import {TestResult} from './TestResult';
import {Quiz} from './quiz';
import {QuizProgression} from './quiz-progression';

export interface QuizResult{
  quiz: Quiz,
  testCache: TestResult[],
  progression: QuizProgression,
  currentTest: number,
  saved: boolean
}
