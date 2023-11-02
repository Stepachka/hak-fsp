import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { AsyncContext } from '../modules/async-context/async-context'
import { GeneratorService } from '../modules/shared/services/generator.service'

@Injectable()
export class AsyncContextMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly generatorService: GeneratorService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.asyncContext.register()
    this.asyncContext.set('traceId', this.generatorService.uuid())
    next()
  }
}
