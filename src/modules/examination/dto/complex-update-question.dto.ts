import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexUpdateAnswerDto } from './complex-update-answer.dto'

export class ComplexUpdateQuestionDto {
  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly examinationId: number

  @ApiProperty({
    type: ComplexUpdateAnswerDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly answers: ComplexUpdateAnswerDto[]
}
