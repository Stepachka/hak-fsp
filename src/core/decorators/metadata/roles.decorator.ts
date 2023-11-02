import { SetMetadata } from '@nestjs/common'
import { Roles as RolesType } from '../../interfaces/common'

export const ROLES_KEY = Symbol('Roles')

export const RequiredRoles = (...roles: RolesType[]) =>
  SetMetadata(ROLES_KEY, roles)
