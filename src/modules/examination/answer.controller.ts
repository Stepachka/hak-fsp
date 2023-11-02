import {
  UpdateExaminationAnswerDto,
  ReadExaminationAnswerFilterDto,
  CreateExaminationAnswerDto,
  UpdatePartiallyExaminationAnswerDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ExaminationAnswer } from '../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { Roles } from '../../core/interfaces/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { AnswerService } from './answer.service'

const BaseController = buildBaseControllerCRUD<ExaminationAnswer>({
  swagger: { model: ExaminationAnswer, modelName: 'examination-answer' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadExaminationAnswerFilterDto,
  createDto: CreateExaminationAnswerDto,
  updateDto: UpdateExaminationAnswerDto,
  updatePartiallyDto: UpdatePartiallyExaminationAnswerDto
})

@ApiExtraModels(
  UpdateExaminationAnswerDto,
  ReadExaminationAnswerFilterDto,
  CreateExaminationAnswerDto,
  UpdatePartiallyExaminationAnswerDto
)
@ApiTags('Examination Answer')
@Controller('examination-answer')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class AnswerController extends BaseController {
  constructor(private readonly answerService: AnswerService) {
    super(answerService)
  }
}
