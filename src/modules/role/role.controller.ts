import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { buildBaseControllerCRUD } from 'src/core/bases/controllers'
import { Role } from 'src/database/models/singles/Role/role.model'
import {
  CreateRoleDto,
  ReadRoleFilterDto,
  UpdatePartiallyRoleDto,
  UpdateRoleDto
} from './dto'
import { RoleService } from './role.service'
import { Roles } from '../../core/interfaces/common'

const BaseController = buildBaseControllerCRUD<Role>({
  privacySettings: {
    createRequireRoles: [Roles.Owner],
    updateRequireRoles: [Roles.Owner],
    deleteRequireRoles: [Roles.Owner]
  },
  swagger: { model: Role, modelName: 'role' },
  filterDto: ReadRoleFilterDto,
  createDto: CreateRoleDto,
  updateDto: UpdateRoleDto,
  updatePartiallyDto: UpdatePartiallyRoleDto
})

@ApiExtraModels(
  ReadRoleFilterDto,
  CreateRoleDto,
  UpdateRoleDto,
  UpdatePartiallyRoleDto
)
@ApiTags('Role')
@Controller('role')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class RoleController extends BaseController {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }
}
