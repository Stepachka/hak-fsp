import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'
import { IsPublic } from '../../core/decorators'
import { AuthService } from './auth.service'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { DateService } from '../../core/modules/shared/services/date.service'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../user/dto'
import { CheckRefreshGuard } from '../../core/guards'
import { Req } from '@nestjs/common/decorators'
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { LoginResponseType } from '../../core/interfaces/common/login-response.type'
import {
  ProcessedError400Type,
  ProcessedError401Type,
  ProcessedError500Type
} from '../../core/interfaces/common/processed-error.type'
import { UserService } from '../user/user.service'
import {
  avatarInclude,
  defaultAvatarInclude,
  roleInclude
} from '../../database/includes/user'

@ApiExtraModels(LoginDto)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ApiConfigService,
    private readonly dateService: DateService
  ) {}

  @ApiOperation({ summary: 'Login endpoint' })
  @ApiOkResponse({
    status: 200,
    schema: {
      anyOf: [{ $ref: getSchemaPath(LoginResponseType) }]
    }
  })
  @ApiBadRequestResponse({
    status: 401,
    schema: {
      $ref: getSchemaPath(ProcessedError401Type)
    }
  })
  @IsPublic(true)
  @Post('login')
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access, refresh } = await this.authService.login(userDto)

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: this.dateService.createExpiresDate(
        this.configService.jwtRefreshConfig.expiresIn as string
      )
    })

    return {
      access,
      user: await this.userService.getByEmail(userDto.email, null, [
        roleInclude,
        avatarInclude,
        defaultAvatarInclude
      ])
    }
  }

  @ApiOperation({ summary: 'Registration endpoint' })
  @ApiOkResponse({
    status: 200,
    schema: {
      anyOf: [{ $ref: getSchemaPath(LoginResponseType) }]
    }
  })
  @ApiBadRequestResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @IsPublic()
  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log('TEST:::::::::', userDto)
    const { access, refresh } = await this.authService.registration(userDto)

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: this.dateService.createExpiresDate(
        this.configService.jwtRefreshConfig.expiresIn as string
      )
    })
    return {
      access,
      user: await this.userService.getByEmail(userDto.email, null, [
        roleInclude,
        avatarInclude,
        defaultAvatarInclude
      ])
    }
  }

  @ApiOperation({ summary: 'Refresh auth endpoint' })
  @ApiOkResponse({
    status: 200,
    schema: {
      anyOf: [{ $ref: getSchemaPath(LoginResponseType) }]
    }
  })
  @ApiBadRequestResponse({
    status: 400,
    schema: {
      $ref: getSchemaPath(ProcessedError400Type)
    }
  })
  @IsPublic()
  @UseGuards(CheckRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { refresh: token } = request.cookies
    const { access, refresh, user } = await this.authService.refresh(token)

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: this.dateService.createExpiresDate(
        this.configService.jwtRefreshConfig.expiresIn as string
      )
    })

    return {
      access,
      user
    }
  }
}
