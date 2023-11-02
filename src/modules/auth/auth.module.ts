import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { SharedModule } from '../../core/modules/shared/shared.module'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { Module } from '@nestjs/common'

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    RoleModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.baseJwtConfig,
      inject: [ApiConfigService]
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
