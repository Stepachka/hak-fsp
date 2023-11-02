import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { AllExceptionsFilter } from './core/exception-filters/all-exceptions.filter'
import { AuthGuard, RolesGuard } from './core/guards'
import { AsyncContextMiddleware } from './core/middlewares'
import { AsyncContextModule } from './core/modules/async-context/async-context.module'
import { ApiConfigService } from './core/modules/shared/services/api-config.service'
import { SharedModule } from './core/modules/shared/shared.module'
import { ErrorsValidationPipe } from './core/pipes'
import { UniqueValidator } from './core/validators'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { StaticFieldModule } from './modules/static-field/static-field.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'node:path'
import { ExaminationModule } from './modules/examination/examination.module'
import { LessonModule } from './modules/lesson/lesson.module'

@Module({
  imports: [
    SharedModule.forRoot({ isGlobal: true }),
    AsyncContextModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.dbConfig,
      inject: [ApiConfigService]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveStaticOptions: {}
    }),
    RoleModule,
    UserModule,
    AuthModule,
    StaticFieldModule,
    ExaminationModule,
    LessonModule
    //ArticleTestModule
  ],
  controllers: [],
  providers: [
    JwtService,
    UniqueValidator,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_PIPE,
      useClass: ErrorsValidationPipe
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*')
  }
}
