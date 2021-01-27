export interface QuizProgression{
  success: number,
  notRespond: number,
  error: number,
  rest: number
}

export enum QuizProgressionEnum{
  'success', 'error', 'notRespond', 'none'
}

