import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ErrorMessagesConstants } from '../constants'
import { ROLES_KEY } from '../decorators/metadata/roles.decorator'
import { ForbiddenException } from '../exceptions/build-in'
import { Roles } from '../interfaces/common'
import { AsyncContext } from '../modules/async-context/async-context'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!roles || !roles.length) return true

    return this.matchRoles(roles, this.asyncContext.get('user')?.roleName)
  }

  private matchRoles(requireRoles: Roles[], userRole: Roles): boolean {
    if (requireRoles.includes(userRole)) return true
    throw new ForbiddenException(
      ErrorMessagesConstants.Forbidden,
      'not enough rights'
    )
  }
}
