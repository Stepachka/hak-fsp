import { Roles } from '../interfaces/common'

export type JwtTokenPayloadType = {
  id: number
  email: string
  roleId: number
  roleName: Roles
}
