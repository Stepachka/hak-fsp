import { Roles } from '../../../../core/interfaces/common'

export interface CreateRoleAttributes {
  readonly name: Roles
  readonly description?: string
}
