import { buildBaseControllerReadShort } from '../../core/bases/controllers'
import { User } from '../../database/models/singles/User/user.model'
import { ReadUserFilterDto, UserShortDto } from './dto'
import { UserShortService } from './user-short.service'
import { Controller } from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'

const BaseController = buildBaseControllerReadShort<User, UserShortDto>({
  privacySettings: {
    autocompleteIsPublic: true,
    getShortAllIsPublic: true,
    getShortByIdIsPublic: true
  },
  filterDto: ReadUserFilterDto,
  swagger: { modelName: 'userShort', model: User, shortModel: UserShortDto }
})

@ApiExtraModels(UserShortDto)
@ApiTags('User-short')
@Controller('user-short')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class UserShortController extends BaseController {
  constructor(private readonly userShortService: UserShortService) {
    super(userShortService)
  }
}
