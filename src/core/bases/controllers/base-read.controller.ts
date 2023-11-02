import { Get, Param, ParseIntPipe, Req } from '@nestjs/common'
import { ApiExtraModels } from '@nestjs/swagger'
import { Request } from 'express'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants/constraint-messages.constants'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import {
  AutoCompleteType,
  ProcessedError400Type,
  ProcessedError404Type
} from 'src/core/interfaces/common'
import { PagingType } from 'src/core/interfaces/common/paging'
import { PagingOptionsType } from 'src/core/interfaces/common/paging/paging-options.interface'
import { BaseControllerRead } from 'src/core/interfaces/rest/controllers'
import { IConfigControllerRead } from 'src/core/interfaces/rest/controllers/controller-read.interface'
import { BaseServiceRead } from 'src/core/interfaces/rest/services'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../utils'
import {
  AutocompleteEndpoint,
  GetAllEndpoint,
  GetOneEndpoint
} from '../decorators'

export function buildBaseControllerRead<T extends Model<T, any>>(
  config: IConfigControllerRead<T>
): BaseControllerRead<T> {
  @ApiExtraModels(
    PagingType,
    PagingOptionsType,
    AutoCompleteType,
    ProcessedError400Type,
    ProcessedError404Type
  )
  abstract class ControllerRead extends BaseControllerRead<T> {
    protected constructor(protected readonly service: BaseServiceRead<T>) {
      super(service)
    }

    @GetAllEndpoint<T>({
      modelName: config.swagger.modelName,
      model: config.swagger.model,
      filterDto: config.filterDto,
      requiredRoles: config.privacySettings?.getAllRequireRoles,
      isPublic: config.privacySettings?.getAllIsPublic
    })
    @Get()
    public override async getAll(@Req() req: Request) {
      const query = transformPagingOptions(req.query, config.swagger.model)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.getAll(query.pagingOptions, filterOpts)
    }

    @AutocompleteEndpoint({
      filterDto: config.filterDto,
      requiredRoles: config.privacySettings?.autocompleteRequireRoles,
      isPublic: config.privacySettings?.autocompleteIsPublic
    })
    @Get('/autocomplete')
    public override async autocomplete(@Req() req: Request) {
      const query = transformPagingOptions(req.query, config.swagger.model)
      const filterOpts = await transformReadFilter(
        transformQueryFilter<T>(query.other, config.swagger.model),
        config.filterDto
      )
      return this.service.autocomplete(query.pagingOptions, filterOpts)
    }

    @GetOneEndpoint<T>({
      model: config.swagger.model,
      isPublic: config.privacySettings?.getByIdIsPublic,
      requiredRoles: config.privacySettings?.getByIdRequireRoles,
      modelName: config.swagger.modelName
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
      return this.service.getById(id)
    }
  }

  return ControllerRead as unknown as BaseControllerRead<T>
}
