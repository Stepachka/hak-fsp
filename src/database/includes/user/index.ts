import { Includeable } from 'sequelize'
import { Role } from '../../models/singles/Role/role.model'
import { UserAvatar } from '../../models/related/UserAvatar/user-avatar.model'
import { StaticField } from '../../models/singles/StaticField/static-field.model'

export const roleInclude: Includeable = {
  model: Role,
  as: 'role'
}
export const avatarInclude: Includeable = {
  model: UserAvatar,
  as: 'userAvatar',
  include: [StaticField]
}

export const defaultAvatarInclude: Includeable = {
  model: StaticField,
  as: 'defaultAvatar'
}
