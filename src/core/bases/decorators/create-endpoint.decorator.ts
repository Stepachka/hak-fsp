import { applyDecorators } from '@nestjs/common'
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger'
import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import { Model, Repository } from 'sequelize-typescript'
import { ClassConstructor } from 'class-transformer'
import { ProcessedError500Type } from '../../interfaces/common/processed-error.type'
import { IsPublic, RequiredRoles } from '../../decorators'

interface ICreateEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  modelName?: string
  model: Repository<M> | ClassConstructor<Object>
  createDto: ClassConstructor<Object>
}

export const CreateEndpoint = <M extends Model<M, any>>(
  config: ICreateEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary: config.operationName ?? `Create new ${config.modelName} model`
    }),
    ApiOkResponse({ status: 200, type: config.model }),
    ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    }),
    ApiBody({ type: config.createDto }),
    IsPublic(config.isPublic ?? false),
    RequiredRoles(...(config.requiredRoles ?? []))
  )
