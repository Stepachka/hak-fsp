import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../../database/models/singles/User/user.model'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { UserAvatarService } from './user-avatar.service'
import { StaticFieldModule } from '../static-field/static-field.module'
import { UserShortService } from './user-short.service'
import { UserShortController } from './user-short.controller'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserAvatar]),
    RoleModule,
    StaticFieldModule
  ],
  controllers: [UserController, UserShortController],
  providers: [UserService, UserAvatarService, UserShortService],
  exports: [UserService, UserShortService, UserAvatarService]
})
export class UserModule {}
