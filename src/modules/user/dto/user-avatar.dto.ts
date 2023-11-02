import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UserAvatarDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly staticFieldId: number
}
