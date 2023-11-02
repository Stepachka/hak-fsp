import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { InjectModel } from '@nestjs/sequelize'
import { answersInclude } from '../../database/includes/examinationQuestionAnswers'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'

@Injectable()
export class QuestionService extends BaseServiceCRUD<ExaminationQuestion> {
  constructor(
    @InjectModel(ExaminationQuestion)
    private readonly questionRepository: typeof ExaminationQuestion
  ) {
    super({
      autocompleteProperty: 'name',
      modelRepository: questionRepository,
      includes: [answersInclude]
    })
  }
}
