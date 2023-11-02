import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'
import { BaseUpdateDto } from 'src/core/interfaces/rest/base-update.dto'

export class UpdateRoleDto extends BaseUpdateDto {
  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiPropertyOptional({ enum: Roles })
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name: Roles

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
