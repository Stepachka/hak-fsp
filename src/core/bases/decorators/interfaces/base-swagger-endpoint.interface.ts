import { Roles } from '../../../interfaces/common'

export interface IBaseSwaggerEndpoint {
  isPublic?: boolean
  requiredRoles?: Roles[]
  operationName?: string
}
