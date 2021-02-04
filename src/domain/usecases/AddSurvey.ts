export interface AddSurveyModel {
  question: string
  answers: SurveyAnswers[]
  date: Date

}

export interface SurveyAnswers {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (account: AddSurveyModel) => Promise<void>
}
