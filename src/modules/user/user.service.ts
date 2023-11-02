import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { User } from '../../database/models/singles/User/user.model'
import { InjectModel } from '@nestjs/sequelize'
import {
  avatarInclude,
  roleInclude,
  defaultAvatarInclude
} from '../../database/includes/user'
import { Nullable } from '../../core/types'
import { Includeable } from 'sequelize'
import { NotFoundException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'
import { CreateUserDto } from './dto'
import { UserAvatarService } from './user-avatar.service'
import { GeneratorService } from '../../core/modules/shared/services/generator.service'
import { StaticFieldService } from '../static-field/static-field.service'

@Injectable()
export class UserService extends BaseServiceCRUD<User> {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly userAvatarService: UserAvatarService,
    private readonly generatorService: GeneratorService,
    private readonly staticFiledService: StaticFieldService
  ) {
    super({
      autocompleteProperty: 'nickname',
      modelRepository: userRepository,
      includes: [roleInclude, avatarInclude, defaultAvatarInclude]
    })
  }

  async getByEmail(
    email: string,
    rejectOnEmpty: Nullable<Error> = null,
    include: Includeable[] = []
  ) {
    return this.userRepository.findOne({
      where: { email },
      include,
      rejectOnEmpty:
        rejectOnEmpty ??
        new NotFoundException(ErrorMessagesConstants.NotFound, 'No such user')
    })
  }

  async createComplex(dto: CreateUserDto) {
    if (!dto.defaultAvatarId) {
      const defaultAvatars = await this.staticFiledService.getDefaultsAvatars()
      dto.defaultAvatarId =
        defaultAvatars.items[
          this.generatorService.integer([0, defaultAvatars.items.length])
        ].id
    }
    return await super.create(dto as Required<CreateUserDto>)
  }
}
