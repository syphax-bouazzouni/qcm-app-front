import {Quiz} from '../interfaces/quiz/quiz';
import {testsData} from './tests.data';

export const QuizData: Quiz = {
  id: 'generalites-anatomie',
  label: 'Généralité',
  nbQuestions: testsData.length,
  tests : testsData
}


