import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MinLength
} from 'class-validator'
import {
  ConstraintMessagesConstants,
  InternalConfigurationConstants
} from '../../../core/constants'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsUnique, UniqueValidator } from '../../../core/decorators'
import { User } from '../../../database/models/singles/User/user.model'

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 12)
  @IsUnique(UniqueValidator, [User])
  readonly nickname: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 15)
  readonly name: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @IsEmail({}, { message: ConstraintMessagesConstants.MustBeEmail })
  @IsUnique(UniqueValidator, [User])
  readonly email: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @MinLength(InternalConfigurationConstants.MinPasswordLength)
  readonly password: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  defaultAvatarId?: number
}
