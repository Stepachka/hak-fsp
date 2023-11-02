import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ConstraintMessagesConstants } from 'src/core/constants'

export class BaseUpdateDto {
  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly updatedAt: string

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly createdAt: string
}
