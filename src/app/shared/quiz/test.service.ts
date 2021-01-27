import {Test} from '../../interfaces/quiz/test';
import {QuizProgressionEnum} from '../../interfaces/quiz/quiz-progression';
import {TestResult} from '../../interfaces/quiz/TestResult';


export class TestService {
  private currentTest: Test = {} as Test
  private $propositionsState: boolean[] = []
  private $responseIndex: number[] = []


  constructor() {}

  setTest(test: TestResult): void{
    if (test !== undefined){
      this.currentTest = test.test
      this.$propositionsState = test.propositionsState
      this.$responseIndex = this.currentTest.propositions.filter(x => x.isResponse).map(x => x.index)
      console.log('response ' + this.$responseIndex)
    }
  }

  updatePropositionState(index: number, value: boolean): void{
    this.$propositionsState[index] = value
    console.log('update state of ' + index + ' to ' + value)
  }

  verifyTest(): QuizProgressionEnum{
    const out = this.$propositionsState.filter(x => x)
    let success = true
    if (out.length === 0){
      return  QuizProgressionEnum.notRespond
    } else if (out.length === this.$responseIndex.length) {
      this.$responseIndex.forEach(x => success = success && this.$propositionsState[x])
      return (success ? QuizProgressionEnum.success : QuizProgressionEnum.error)
    }else {
      return QuizProgressionEnum.error
    }
  }


  get propositionsState(): boolean[] {
    return this.$propositionsState;
  }

  get responseIndex(): number[] {
    return this.$responseIndex;
  }

  getCurrentTest(): Test {
    return this.currentTest
  }


}
