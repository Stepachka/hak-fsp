import { Includeable } from 'sequelize'
import { Examination } from '../../models/singles/Examination/examination.model'
import { questionsInclude } from '../examinationQuestions'

export const examinationInclude: Includeable = {
  model: Examination,
  as: 'questions',
  include: [questionsInclude]
}
