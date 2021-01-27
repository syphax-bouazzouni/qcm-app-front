import {QuizResult} from '../../interfaces/quiz/QuizResult';

export class QuizResultService {

  private readonly QUIZ_KEY = 'quiz';

  quizResult: QuizResult = {} as QuizResult
  private $isSavedQuiz = false
  private storage: Storage = localStorage
  constructor() { }

  get isSavedQuiz(): boolean{
    return  this.$isSavedQuiz
  }

  getSavedQuiz(): QuizResult {
    const q = this.storage.getItem(this.QUIZ_KEY)
    if (q) {
      this.$isSavedQuiz = true
      this.quizResult = JSON.parse(q)
    } else {
      this.$isSavedQuiz = false
      this.quizResult = {} as QuizResult
    }
    return this.quizResult
  }


  clearQuiz(): void {
    this.storage.removeItem(this.QUIZ_KEY)
    console.log('storage removed')
  }

  saveQuiz(): void {
    this.storage.setItem(this.QUIZ_KEY, JSON.stringify(this.quizResult))
  }
}
