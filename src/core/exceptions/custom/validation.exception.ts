import { HttpStatus } from '@nestjs/common'
import { ErrorMessagesConstants } from '../../constants'
import { BaseException } from '../base.exception'
import { ValidationErrorType } from '../types/validation.types'

export class ValidationException extends BaseException<ValidationErrorType> {
  constructor(response: ValidationErrorType[]) {
    super(
      {
        message: ErrorMessagesConstants.ValidationError,
        messages: response
      },
      HttpStatus.BAD_REQUEST
    )
  }
}
