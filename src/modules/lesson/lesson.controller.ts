import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Roles } from '../../core/interfaces/common'
import {
  CreateLessonDto,
  ReadLessonFilterDto,
  UpdateLessonDto,
  UpdatePartiallyLessonDto
} from './dto'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { Lesson } from '../../database/models/singles/Lesson/lesson.model'

const BaseController = buildBaseControllerCRUD<Lesson>({
  swagger: { model: Lesson, modelName: 'lesson' },
  privacySettings: {
    updateRequireRoles: [Roles.User],
    createRequireRoles: [Roles.User],
    deleteRequireRoles: [Roles.User]
  },
  filterDto: ReadLessonFilterDto,
  createDto: CreateLessonDto,
  updateDto: UpdatePartiallyLessonDto,
  updatePartiallyDto: UpdateLessonDto
})

@ApiExtraModels(
  CreateLessonDto,
  ReadLessonFilterDto,
  UpdateLessonDto,
  UpdatePartiallyLessonDto
)
@ApiTags('Lesson')
@Controller('lesson')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class LessonController extends BaseController {
  constructor(private readonly lessonService: LessonService) {
    super(lessonService)
  }
}
