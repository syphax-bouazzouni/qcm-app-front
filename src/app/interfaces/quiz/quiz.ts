import {Test} from './test';

export interface Quiz{
  id: string,
  label: string,
  nbQuestions: number,
  tests: Test[]
}
