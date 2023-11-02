import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { NotFoundException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'
import { StaticFieldService } from '../static-field/static-field.service'

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel(UserAvatar)
    private readonly userAvatarRepository: typeof UserAvatar,
    private readonly staticFieldService: StaticFieldService
  ) {}

  async create(userId: number, staticFieldId: number) {
    return this.userAvatarRepository.create({ userId, staticFieldId })
  }

  async update(userId: number, newStaticFieldId: number) {
    const source = await this.userAvatarRepository.findOne({
      where: { userId }
    })
    if (!source)
      throw new NotFoundException(
        ErrorMessagesConstants.NotFound,
        'No such avatar'
      )

    const result = await this.userAvatarRepository.update(
      { userId, staticFieldId: newStaticFieldId },
      {
        where: { userId },
        returning: true
      }
    )
    await this.staticFieldService.delete(source.staticFieldId)
    return result[1]
  }

  async delete(id: number) {
    return this.userAvatarRepository.destroy({
      where: { id }
    })
  }
}
