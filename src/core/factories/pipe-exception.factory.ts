import { ErrorMessagesConstants } from '../constants'
import { BadRequestException } from '../exceptions/build-in'

export const PipeExceptionFactory =
  (target: string, constrains: string[]) => (error: string) =>
    new BadRequestException(ErrorMessagesConstants.BadRequest, error, [
      { target, messages: constrains.map(message => ({ message })) }
    ])
