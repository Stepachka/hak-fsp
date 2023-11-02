import { IBaseSwaggerEndpoint } from './interfaces/base-swagger-endpoint.interface'
import { ClassConstructor } from 'class-transformer'
import { ModelWithId } from '../../interfaces/rest/model-with-id.interface'
import { Model } from 'sequelize-typescript'
import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath
} from '@nestjs/swagger'
import { PagingType } from '../../interfaces/common/paging'
import { PagingOptionsType } from '../../interfaces/common/paging/paging-options.interface'
import {
  AutoCompleteType,
  ProcessedError400Type
} from '../../interfaces/common'
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { IsPublic, RequiredRoles } from '../../decorators'

interface IAutocompleteEndpointConfig extends IBaseSwaggerEndpoint {
  filterDto?: ClassConstructor<ModelWithId>
}

export const AutocompleteEndpoint = (config: IAutocompleteEndpointConfig) =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: config.operationName ?? `Get all models in autocomplete format`
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
                  items: { $ref: getSchemaPath(AutoCompleteType) }
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
    ]
  )
