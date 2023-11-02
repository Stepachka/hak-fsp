import { Get, Param, Req } from '@nestjs/common/decorators'
import { ParseIntPipe } from '@nestjs/common/pipes'
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath
} from '@nestjs/swagger'
import { Request } from 'express'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { IsPublic, RequiredRoles } from 'src/core/decorators'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import {
  AutoCompleteType,
  ProcessedError400Type,
  ProcessedError404Type
} from 'src/core/interfaces/common'
import { PagingType } from 'src/core/interfaces/common/paging'
import { PagingOptionsType } from 'src/core/interfaces/common/paging/paging-options.interface'
import {
  BaseControllerReadShort,
  IConfigControllerReadShort
} from 'src/core/interfaces/rest/controllers'
import { ModelWithId } from 'src/core/interfaces/rest/model-with-id.interface'
import { BaseServiceReadShort } from 'src/core/interfaces/rest/services'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../utils'
import { GetAllEndpoint, GetOneEndpoint } from '../decorators'

export function buildBaseControllerReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
>(config: IConfigControllerReadShort<T>): BaseControllerReadShort<T, TShort> {
  @ApiExtraModels(
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ProcessedError400Type,
    ProcessedError404Type
  )
  abstract class ControllerReadShort extends BaseControllerReadShort<
    T,
    TShort
  > {
    protected constructor(
      protected readonly service: BaseServiceReadShort<T, TShort>
    ) {
      super(service)
    }

    @GetAllEndpoint<T>({
      modelName: config.swagger.modelName,
      isShort: true,
      isPublic: config.privacySettings?.getShortAllIsPublic,
      filterDto: config.filterDto,
      model: config.swagger.shortModel,
      requiredRoles: config.privacySettings?.getAllShortRequireRoles
    })
    @Get()
    public override async getAll(@Req() req: Request) {
      const query = transformPagingOptions(req.query, config.swagger.model)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.getAllShort(query.pagingOptions, filterOpts)
    }

    @ApiOperation({ summary: 'Get model by id' })
    @ApiOkResponse({
      status: 200,
      schema: {
        $ref: getSchemaPath(config.swagger.shortModel)
      }
    })
    @ApiNotFoundResponse({
      status: 404,
      schema: {
        $ref: getSchemaPath(ProcessedError404Type)
      }
    })
    @IsPublic(config.privacySettings?.getShortByIdIsPublic ?? false)
    @RequiredRoles(...(config.privacySettings?.getByIdShortRequireRoles ?? []))
    @GetOneEndpoint({
      model: config.swagger.shortModel,
      requiredRoles: config.privacySettings?.getByIdShortRequireRoles,
      modelName: config.swagger.modelName,
      isPublic: config.privacySettings?.getShortByIdIsPublic
    })
    @Get('/:id')
    public override async getById(
      @Param(
        'id',
        new ParseIntPipe({
          exceptionFactory: PipeExceptionFactory('id', [
            ConstraintMessagesConstants.MustBeInteger
          ])
        })
      )
      id: number
    ) {
      return this.service.getShortById(id)
    }
  }

  return ControllerReadShort as unknown as BaseControllerReadShort<T, TShort>
}
