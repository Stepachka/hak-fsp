import { Injectable } from '@nestjs/common'
import { DocumentBuilder } from '@nestjs/swagger'
import { ApiConfigService } from './api-config.service'
import { Role } from '../../../../database/models/singles/Role/role.model'
import { User } from '../../../../database/models/singles/User/user.model'
import {
  BaseProcessedError,
  ProcessedError400Type,
  ProcessedError401Type,
  ProcessedError404Type,
  ProcessedError500Type
} from '../../../interfaces/common/processed-error.type'
import { PagingType } from '../../../interfaces/common/paging'
import { PagingOptionsType } from '../../../interfaces/common/paging/paging-options.interface'
import { AutoCompleteType } from '../../../interfaces/common'
import { LoginResponseType } from '../../../interfaces/common/login-response.type'
import {
  ValidationErrorType,
  ValidationMessageType
} from '../../../exceptions/types/validation.types'
import { StaticField } from '../../../../database/models/singles/StaticField/static-field.model'
import { UserAvatar } from '../../../../database/models/related/UserAvatar/user-avatar.model'
import { Examination } from '../../../../database/models/singles/Examination/examination.model'
import { ExaminationAnswer } from '../../../../database/models/singles/ExaminationAnswer/examination-answer.model'
import { Lesson } from '../../../../database/models/singles/Lesson/lesson.model'
import { ExaminationQuestion } from '../../../../database/models/singles/ExaminationQuestion/examination-question.model'

@Injectable()
export class SwaggerConfigProvider {
  constructor(private readonly configService: ApiConfigService) {}

  public documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('REST API docs of r-journal platform')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('Created by Denis Rybkin')
    .setContact(
      'Denis Rybkin',
      'https://github.com/DenisRybkin',
      'denis.rybkin.94@mail.ru'
    )
    .build()

  public docsPrefix = '/api/docs'

  private dbModels = [
    User,
    UserAvatar,
    Role,
    StaticField,
    Examination,
    ExaminationAnswer,
    ExaminationQuestion,
    Lesson
  ]
  private miscModels = [
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ValidationMessageType,
    ValidationErrorType,
    BaseProcessedError,
    ProcessedError400Type,
    ProcessedError401Type,
    ProcessedError404Type,
    ProcessedError500Type,
    LoginResponseType
  ]

  public extraModels = [...this.dbModels, ...this.miscModels]
}
