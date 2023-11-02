import { ExaminationAnswer } from '../../models/singles/ExaminationAnswer/examination-answer.model'
import { Includeable } from 'sequelize'

export const answersInclude: Includeable = {
  model: ExaminationAnswer,
  as: 'answers'
}
