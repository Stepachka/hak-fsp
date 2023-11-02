import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import {
  CreateUserDto,
  ReadUserFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
  UserAvatarDto
} from './dto'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req
} from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { UserAvatarService } from './user-avatar.service'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { Get } from '@nestjs/common/decorators'
import {
  CreateEndpoint,
  DeleteEndpoint,
  GetAllEndpoint,
  GetOneEndpoint,
  UpdatePartiallyEndpoint
} from '../../core/bases/decorators'
import { UserAvatar } from '../../database/models/related/UserAvatar/user-avatar.model'
import { Request } from 'express'
import {
  transformPagingOptions,
  transformQueryFilter,
  transformReadFilter
} from '../../core/bases/utils'

const BaseController = buildBaseControllerCRUD<User>({
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    checkPermissionForUpdateInfo: {
      EntityClass: User,
      comparableFieldName: 'id'
    }
  },
  swagger: { model: User, modelName: 'user' },
  filterDto: ReadUserFilterDto,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
  updatePartiallyDto: UpdatePartiallyUserDto
})

@ApiExtraModels(
  ReadUserFilterDto,
  CreateUserDto,
  UpdateUserDto,
  UpdatePartiallyUserDto,
  UserAvatarDto
)
@ApiTags('User')
@Controller('user')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
    private readonly userAvatarService: UserAvatarService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(userService)
  }

  @GetOneEndpoint({
    operationName: 'get user details',
    model: User,
    modelName: 'user'
  })
  @Get('/get-me')
  async getMe() {
    const { id: userId } = this.asyncContext.get('user')
    return this.userService.getById(userId)
  }

  @CreateEndpoint({
    operationName: 'Create avatar of user',
    model: UserAvatar,
    createDto: UserAvatarDto
  })
  @Post('/avatar')
  async createAvatar(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.create(userId, dto.staticFieldId)
  }

  @UpdatePartiallyEndpoint({
    operationName: 'update staticFieldId (update avatar)',
    model: UserAvatar,
    updateDto: UserAvatarDto
  })
  @Patch('/avatar')
  async updateAvatar(@Body() dto: UserAvatarDto) {
    const { id: userId } = this.asyncContext.get('user')
    return this.userAvatarService.update(userId, dto.staticFieldId)
  }

  @DeleteEndpoint({
    operationName: 'Delete avatar of user by id'
  })
  @Delete('/avatar/:id')
  public async deleteAvatar(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number
  ) {
    const countDeleted = await this.userAvatarService.delete(id)
    return countDeleted >= 1
  }
}
