import { applyDecorators } from '@nestjs/common'
import { Model, Repository } from 'sequelize-typescript'
import { ClassConstructor } from 'class-transformer'
import { ModelWithId } from '../../interfaces/rest/model-with-id.interface'
import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath
} from '@nestjs/swagger'
import { PagingType } from '../../interfaces/common/paging'
import { PagingOptionsType } from '../../interfaces/common/paging/paging-options.interface'
import { ProcessedError400Type } from '../../interfaces/common'
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { IsPublic, RequiredRoles } from '../../decorators'

interface IGetAllEndpointConfig<M extends Model<M, any>>
  extends IBaseSwaggerEndpoint {
  isShort?: boolean
  modelName?: string
  model: Repository<M> | ClassConstructor<ModelWithId>
  filterDto?: ClassConstructor<ModelWithId>
}

export const GetAllEndpoint = <M extends Model<M, any>>(
  config: IGetAllEndpointConfig<M>
) =>
  applyDecorators(
    ApiOperation({
      summary:
        config.operationName ??
        `Get all ${config.modelName} ${config.isShort && 'short'} models`
    }),
    ApiOkResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PagingType) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(config.model) }
              },
              pagingOptions: { $ref: getSchemaPath(PagingOptionsType) }
            }
          }
        ]
      }
    }),
    ApiBadRequestResponse({
      status: 400,
      type: ProcessedError400Type
    }),
    ApiQuery({
      name: 'filters',
      required: false,
      schema: {
        allOf: [
          {
            ...(config.filterDto &&
              ({ $ref: getSchemaPath(config.filterDto) } as SchemaObject))
          },
          { $ref: getSchemaPath(PagingOptionsType) }
        ]
      }
    }),
    IsPublic(config.isPublic ?? false),
    RequiredRoles(...(config.requiredRoles ?? []))
  )
