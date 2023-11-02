import { Role } from 'src/database/models/singles/Role/role.model'
import { RoleShort } from '../dto'

export const role2roleShortMapper = (role: Role): RoleShort => ({
  id: role.id,
  description: role.description!,
  name: role.name
})
