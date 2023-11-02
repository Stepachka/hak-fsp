import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadExaminationAnswerFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly questionId: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: ConstraintMessagesConstants.MustBeBoolean })
  readonly isRight: boolean
}
