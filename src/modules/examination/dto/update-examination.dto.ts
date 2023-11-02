import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class UpdateExaminationDto {
  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly title: string

  @ApiPropertyOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string

  @ApiPropertyOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly certificateRoleId: number
}
