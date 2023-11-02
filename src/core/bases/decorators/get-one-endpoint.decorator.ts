import { applyDecorators } from '@nestjs/common'
import { Model, Repository } from 'sequelize-typescript'
import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger'
import { ProcessedError404Type } from '../../interfaces/common'
import { IsPublic, RequiredRoles } from '../../decorators'
import { ClassConstructor } from 'class-transformer'
import { ModelWithId } from '../../interfaces/rest/model-with-id.interface'

interface IGetByIdEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  modelName?: string
  model: Repository<M> | ClassConstructor<ModelWithId> | NumberConstructor
}

export const GetOneEndpoint = <M extends Model<M, any>>(
  config: IGetByIdEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary: config.operationName ?? `Get ${config.modelName} model by id`
    }),
    ApiOkResponse({
      status: 200,
      type: config.model
    }),
    ApiBadRequestResponse({
      status: 404,
      type: ProcessedError404Type
    }),
    IsPublic(config.isPublic ?? false),
    RequiredRoles(...(config.requiredRoles ?? []))
  )
