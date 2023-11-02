import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { ErrorMessagesConstants } from '../constants'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const responseBody = {
      statusCode: this.getStatus(exception),
      ...this.getResponse(exception),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest<Request>())
    }

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      this.getStatus(exception)
    )
  }

  private getStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getResponse(exception: unknown): object {
    return exception instanceof HttpException
      ? exception.getResponse() instanceof Object
        ? (exception.getResponse() as object)
        : { messages: exception.getResponse() }
      : { message: ErrorMessagesConstants.InternalError, messages: exception }
  }
}
