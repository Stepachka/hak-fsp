import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'

export class UpdatePartiallyRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id?: number

  @ApiPropertyOptional({ enum: Roles })
  @IsOptional()
  @IsEnum(Roles, { message: ConstraintMessagesConstants.MustBeEnum })
  readonly name?: Roles

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description?: string
}
