import { HttpModule } from '@nestjs/axios'
import { DynamicModule } from '@nestjs/common'
import { ApiConfigService } from './services/api-config.service'
import { DateService } from './services/date.service'
import { GeneratorService } from './services/generator.service'
import { SwaggerConfigProvider } from './services/swagger-config.service'
import { UrlService } from './services/url.service'

interface SharedModuleOptions {
  isGlobal?: boolean
}

export class SharedModule {
  static forRoot(options?: SharedModuleOptions): DynamicModule {
    const providers = [
      ApiConfigService,
      DateService,
      GeneratorService,
      UrlService,
      SwaggerConfigProvider
    ]

    return {
      module: SharedModule,
      global: !!options?.isGlobal,
      providers,
      imports: [HttpModule],
      exports: [...providers, HttpModule]
    }
  }
}
