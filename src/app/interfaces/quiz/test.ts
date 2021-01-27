import {Proposition} from './proposition';

export enum TestType {
  'QCU', 'QCM'
}
export interface Test{
  question: string,
  type: TestType,
  source: string
  propositions: Array<Proposition>
}
