import { BaseException } from '../base.exception'
import { HttpStatus } from '@nestjs/common'

export class UnauthorizedException extends BaseException {
  constructor(message: string, internalMessage?: string, messages?: any[]) {
    super({ message, internalMessage, messages }, HttpStatus.UNAUTHORIZED)
  }
}
