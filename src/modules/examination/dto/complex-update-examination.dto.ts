import { ApiProperty } from '@nestjs/swagger'
import { MinLength, ValidateNested } from 'class-validator'
import { ComplexUpdateQuestionDto } from './complex-update-question.dto'

export class ComplexUpdateExaminationDto {
  @ApiProperty({
    type: ComplexUpdateQuestionDto,
    isArray: true
  })
  @MinLength(2)
  @ValidateNested({ each: true })
  readonly questions: ComplexUpdateQuestionDto[]
}
