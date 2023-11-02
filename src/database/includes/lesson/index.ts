import { Includeable } from 'sequelize'
import { examinationInclude } from '../examination'
import { Lesson } from '../../models/singles/Lesson/lesson.model'

export const lessonInclude: Includeable = {
  model: Lesson,
  as: 'examinations',
  include: [examinationInclude]
}
