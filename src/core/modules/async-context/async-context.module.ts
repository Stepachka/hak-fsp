import { DynamicModule } from '@nestjs/common'
import { AsyncLocalStorage } from 'async_hooks'
import { AsyncContext } from './async-context'

interface AsyncContextModuleOptions {
  isGlobal?: boolean
  alsInstance?: AsyncLocalStorage<any>
}

export class AsyncContextModule {
  static forRoot(options?: AsyncContextModuleOptions): DynamicModule {
    return {
      module: AsyncContextModule,
      global: options?.isGlobal ?? false,
      providers: [
        {
          provide: AsyncContext,
          useValue: new AsyncContext(
            options?.alsInstance ?? new AsyncLocalStorage()
          )
        }
      ],
      exports: [AsyncContext]
    }
  }
}
