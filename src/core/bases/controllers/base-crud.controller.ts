import { Body, Delete, Param, Patch, Post, Put } from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { Model } from 'sequelize-typescript'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory'
import {
  BaseControllerCRUD,
  IConfigControllerCRUD
} from 'src/core/interfaces/rest/controllers'
import { BaseServiceCRUD } from 'src/core/interfaces/rest/services'
import { buildBaseControllerRead } from './'
import { MakeNullishOptional } from 'sequelize/types/utils'
import { CreateEndpoint, UpdateEndpoint, DeleteEndpoint } from '../decorators'
import { ApiBearerAuth } from '@nestjs/swagger'

export function buildBaseControllerCRUD<T extends Model<T, any>>(
  config: IConfigControllerCRUD<T>
): BaseControllerCRUD<T> {
  const ControllerRead = buildBaseControllerRead<T>(config)

  class CreateDto extends config.createDto {}
  class UpdateDto extends config.updateDto {}
  class UpdatePartially extends config.updatePartiallyDto {}

  // eslint-disable-next-line
  //@ts-ignore
  class ControllerCRUD extends ControllerRead implements BaseControllerCRUD<T> {
    constructor(protected readonly service: BaseServiceCRUD<T>) {
      super(service)
    }
    @ApiBearerAuth()
    @CreateEndpoint({
      modelName: config.swagger.modelName,
      model: config.swagger.model,
      isPublic: config.privacySettings?.createIsPublic,
      createDto: config.createDto,
      requiredRoles: config.privacySettings?.createRequireRoles
    })
    @Post()
    public async create(@Body() dto: CreateDto) {
      return await this.service.create(
        dto as MakeNullishOptional<T['_creationAttributes']>
      )
    }

    @UpdateEndpoint({
      modelInfo: config.privacySettings?.checkPermissionForUpdateInfo,
      requiredRoles: config.privacySettings?.updateRequireRoles,
      isPublic: config.privacySettings?.updateIsPublic,
      updateDto: config.updateDto,
      model: config.swagger.model,
      modelName: config.swagger.modelName
    })
    @Put('/:id')
    public async update(
      @Param(
        'id',
        new ParseIntPipe({
          exceptionFactory: PipeExceptionFactory('id', [
            ConstraintMessagesConstants.MustBeInteger
          ])
        })
      )
      id: number,
      @Body() dto: UpdateDto
    ) {
      if ('id' in dto) delete dto.id
      return await this.service.update(id, dto as T)
    }

    @UpdateEndpoint({
      modelInfo: config.privacySettings?.checkPermissionForUpdateInfo,
      requiredRoles: config.privacySettings?.updateRequireRoles,
      isPublic: config.privacySettings?.updateIsPublic,
      updateDto: config.updatePartiallyDto,
      model: config.swagger.model,
      modelName: config.swagger.modelName
    })
    @Patch('/:id')
    public async updatePartially(
      @Param(
        'id',
        new ParseIntPipe({
          exceptionFactory: PipeExceptionFactory('id', [
            ConstraintMessagesConstants.MustBeInteger
          ])
        })
      )
      id: number,
      @Body() dto: UpdatePartially
    ) {
      if ('id' in dto) delete dto.id
      return this.service.update(id, dto as Partial<T>)
    }

    @DeleteEndpoint({
      isPublic: config.privacySettings?.deleteIsPublic,
      requiredRoles: config.privacySettings?.deleteRequireRoles,
      modelName: config.swagger.modelName
    })
    @Delete('/:id')
    public async delete(
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
      const countDeleted = await this.service.delete(id)
      return countDeleted >= 1
    }
  }

  return ControllerCRUD as unknown as BaseControllerCRUD<T>
}
