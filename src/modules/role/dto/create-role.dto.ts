import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'

export class CreateRoleDto {
  @ApiProperty({ enum: Roles })
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name: Roles

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
