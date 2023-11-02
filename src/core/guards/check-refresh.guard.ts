import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { ErrorMessagesConstants } from '../constants'
import { BadRequestException } from '../exceptions/build-in'

@Injectable()
export class CheckRefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const { refresh: token } = request.cookies

    if (!token)
      throw new BadRequestException(
        ErrorMessagesConstants.BadRequest,
        'Refresh token not passed'
      )

    return true
  }
}
