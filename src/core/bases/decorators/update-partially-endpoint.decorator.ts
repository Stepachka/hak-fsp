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
import {
  CheckPermissionUpdate,
  IModelInfo,
  IsPublic,
  RequiredRoles
} from '../../decorators'

interface IUpdatePartiallyEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  modelName?: string
  model: Repository<M> | ClassConstructor<Object>
  updateDto: ClassConstructor<Object>
  modelInfo?: IModelInfo
}

export const UpdatePartiallyEndpoint = <M extends Model<M, any>>(
  config: IUpdatePartiallyEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary:
        config.operationName ?? `Partially full update ${config.modelName}`
    }),
    ApiOkResponse({ status: 200, type: config.model }),
    ApiInternalServerErrorResponse({
      status: 500,
      type: ProcessedError500Type
    }),
    ApiBody({ type: config.updateDto }),
    IsPublic(config.isPublic ?? false),
    RequiredRoles(...(config.requiredRoles ?? [])),
    CheckPermissionUpdate(config.modelInfo)
  )
