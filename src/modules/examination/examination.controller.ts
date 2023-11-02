import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { Examination } from '../../database/models/singles/Examination/examination.model'
import { Roles } from '../../core/interfaces/common'
import {
  ComplexCreateExaminationDto,
  ComplexUpdateExaminationDto,
  CreateExaminationDto,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
} from './dto'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ExaminationService } from './examination.service'
import { CreateEndpoint, UpdateEndpoint } from '../../core/bases/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'

const BaseController = buildBaseControllerCRUD<Examination>({
  swagger: { model: Examination, modelName: 'examination' },
  privacySettings: {
    updateRequireRoles: [Roles.Admin, Roles.Owner],
    createRequireRoles: [Roles.Admin, Roles.Owner],
    deleteRequireRoles: [Roles.Admin, Roles.Owner]
  },
  filterDto: ReadExaminationFilterDto,
  createDto: CreateExaminationDto,
  updateDto: UpdatePartiallyExaminationDto,
  updatePartiallyDto: UpdateExaminationDto
})

@ApiExtraModels(
  CreateExaminationDto,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
)
@ApiTags('Examination')
@Controller('examination')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ExaminationController extends BaseController {
  constructor(private readonly examinationService: ExaminationService) {
    super(examinationService)
  }
  @CreateEndpoint({
    operationName: 'Endpoint for create examination with full dto model',
    modelName: 'examination',
    createDto: ComplexCreateExaminationDto,
    model: ComplexCreateExaminationDto,
    requiredRoles: [Roles.User]
  })
  @Post('/complex')
  async createComplex(@Body() dto: ComplexCreateExaminationDto) {
    return await this.examinationService.createComplex(dto)
  }

  @UpdateEndpoint({
    operationName: 'Endpoint for update test with full test dto model',
    modelName: 'article test',
    updateDto: ComplexUpdateExaminationDto,
    model: ComplexUpdateExaminationDto,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  })
  @Put('/complex/:id')
  async updateComplex(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number,
    @Body() dto: ComplexUpdateExaminationDto
  ) {
    return await this.examinationService.updateComplex(id, dto)
  }
}
