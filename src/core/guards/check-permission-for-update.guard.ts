import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectConnection } from '@nestjs/sequelize'
import { Request } from 'express'
import { Sequelize } from 'sequelize-typescript'
import {
  ConstraintMessagesConstants,
  ErrorMessagesConstants
} from '../constants'
import { IModelInfo, MODEL_INFO_KEY } from '../decorators'
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException
} from '../exceptions/build-in'
import { PipeExceptionFactory } from '../factories/pipe-exception.factory'
import { AsyncContext } from '../modules/async-context/async-context'

@Injectable()
export class CheckPermissionForUpdateGuard implements CanActivate {
  constructor(
    @InjectConnection() private readonly connection: Sequelize,
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const modelInfo = this.reflector.get<IModelInfo>(
      MODEL_INFO_KEY,
      context.getHandler()
    )

    if (!modelInfo) return true
    if (!modelInfo.EntityClass)
      throw new InternalServerErrorException(
        ErrorMessagesConstants.InternalError,
        'Something went wrong'
      )

    const entityId = Number(request.params.id)

    if (!entityId || !Number.isInteger(entityId))
      throw PipeExceptionFactory('id', [
        ConstraintMessagesConstants.MustBeInteger
      ])('Validation failed (numeric string is expected)')

    const model = await this.connection
      .getRepository(modelInfo.EntityClass)
      .findByPk(entityId, {
        rejectOnEmpty: new NotFoundException(
          ErrorMessagesConstants.NotFound,
          `No such ${modelInfo.EntityClass.name}`
        )
      })

    try {
      const { id } = this.asyncContext.get('user')
      const isCreator =
        id == (model as any)[modelInfo.comparableFieldName ?? 'createdByUserId']

      if (!isCreator)
        throw new ForbiddenException(
          ErrorMessagesConstants.Forbidden,
          'You must be the creator'
        )

      return true
    } catch (exception) {
      throw new ForbiddenException(
        ErrorMessagesConstants.Forbidden,
        'You must be the creator'
      )
    }
  }
}
