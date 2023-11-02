import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, ValidateNested } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { ComplexCreateAnswerDto } from './complex-create-answer.dto'

export class ComplexCreateQuestionDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty({
    type: ComplexCreateAnswerDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly answers: ComplexCreateAnswerDto[]
}
