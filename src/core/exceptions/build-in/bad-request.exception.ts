import { HttpStatus } from '@nestjs/common'
import { BaseException } from '../base.exception'

export class BadRequestException extends BaseException {
  constructor(message: string, internalMessage?: string, messages?: any[]) {
    super({ message, internalMessage, messages }, HttpStatus.BAD_REQUEST)
  }
}
