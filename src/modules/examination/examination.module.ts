import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { ExaminationService } from './examination.service'
import { ExaminationController } from './examination.controller'
import { QuestionController } from './question.controller'
import { AnswerController } from './answer.controller'
import { QuestionService } from './question.service'
import { AnswerService } from './answer.service'
import { Lesson } from '../../database/models/singles/Lesson/lesson.model'
import { ExaminationQuestion } from '../../database/models/singles/ExaminationQuestion/examination-question.model'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Examination,
      Lesson,
      ExaminationAnswer,
      ExaminationQuestion
    ])
  ],
  controllers: [ExaminationController, QuestionController, AnswerController],
  providers: [ExaminationService, QuestionService, AnswerService],
  exports: [ExaminationService]
})
export class ExaminationModule {}
