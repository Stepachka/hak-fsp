import { HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionResponseType } from '../types'

export class BaseException<T = any> extends HttpException {
  constructor(response: BaseExceptionResponseType<T>, status: HttpStatus) {
    super(response, status)
  }
}
