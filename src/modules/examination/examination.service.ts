import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { InjectModel } from '@nestjs/sequelize'
import { questionsInclude } from '../../database/includes/examinationQuestions'
import { QuestionService } from './question.service'
import { AnswerService } from './answer.service'
import { ComplexCreateExaminationDto, ComplexUpdateExaminationDto } from './dto'

@Injectable()
export class ExaminationService extends BaseServiceCRUD<Examination> {
  constructor(
    @InjectModel(Examination)
    private readonly examinationRepository: typeof Examination,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService
  ) {
    super({
      autocompleteProperty: 'title',
      modelRepository: examinationRepository,
      includes: [questionsInclude]
    })
  }

  async createComplex(
    dto: ComplexCreateExaminationDto
  ): Promise<ComplexCreateExaminationDto> {
    const examination = await super.create({
      title: dto.title,
      description: dto.description,
      lessonId: dto.lessonId
    })
    const questions = await Promise.all(
      dto.questions.map(question =>
        this.questionService.create({
          name: question.name,
          examinationId: examination.id
        })
      )
    )
    const answers = await Promise.all(
      dto.questions
        .map((question, questionIndex) =>
          question.answers.map(answer => ({
            ...answer,
            questionId: questions[questionIndex].id
          }))
        )
        .flat(1)
        .map(answer =>
          this.answerService.create({
            questionId: answer.questionId,
            isRight: answer.isRight,
            name: answer.name
          })
        )
    )
    return {
      ...examination,
      questions: questions.map(question => ({
        ...question,
        answers: answers.filter(answer => answer.questionId == question.id)
      }))
    }
  }

  async updateComplex(
    id: number,
    dto: ComplexUpdateExaminationDto
  ): Promise<ComplexUpdateExaminationDto> {
    const [questions, answers] = await Promise.all([
      Promise.all(
        dto.questions.map(question =>
          this.questionService.update(question.id, {
            name: question.name,
            examinationId: question.examinationId
          })
        )
      ),
      Promise.all(
        dto.questions
          .map(question => question.answers)
          .flat(1)
          .map(answer =>
            this.answerService.update(answer.id, {
              name: answer.name,
              questionId: answer.questionId,
              isRight: answer.isRight
            })
          )
      )
    ])
    return {
      ...dto,
      questions: questions.map(question => ({
        ...question,
        answers: answers.filter(answer => answer.questionId == question.id)
      }))
    }
  }
}
