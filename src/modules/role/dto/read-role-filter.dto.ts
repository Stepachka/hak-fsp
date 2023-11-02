import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'
import { Roles } from 'src/core/interfaces/common'

export class ReadRoleFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
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
