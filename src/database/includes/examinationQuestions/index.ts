import { ExaminationQuestion } from '../../models/singles/ExaminationQuestion/examination-question.model'
import { ExaminationAnswer } from '../../models/singles/ExaminationAnswer/examination-answer.model'
import { Includeable } from 'sequelize'

export const questionsInclude: Includeable = {
  model: ExaminationQuestion,
  as: 'answers',
  include: [ExaminationAnswer]
}
