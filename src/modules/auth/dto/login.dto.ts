import { IsEmail, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @IsEmail({}, { message: ConstraintMessagesConstants.MustBeEmail })
  readonly email: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly password: string
}
