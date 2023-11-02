import { BaseServiceReadShort } from '../../core/bases/services'
import { User } from '../../database/models/singles/User/user.model'
import { UserShortDto } from './dto'
import { InjectModel } from '@nestjs/sequelize'
import { user2userShortMapper } from './utils/user2user-short.mapper'
import { Injectable } from '@nestjs/common'
import { avatarInclude, roleInclude } from '../../database/includes/user'
import { defaultAvatarInclude } from '../../database/includes/user'

@Injectable()
export class UserShortService extends BaseServiceReadShort<User, UserShortDto> {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    super({
      autocompleteProperty: 'nickname',
      modelRepository: userRepository,
      mapper: user2userShortMapper,
      includes: [roleInclude, avatarInclude, defaultAvatarInclude]
    })
  }
}
