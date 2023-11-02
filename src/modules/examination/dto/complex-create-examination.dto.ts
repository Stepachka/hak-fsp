import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsInt,
  IsString,
  MinLength,
  ValidateNested
} from 'class-validator'
import { ComplexCreateQuestionDto } from './complex-create-question.dto'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ComplexCreateExaminationDto {
  @ApiProperty({ example: 1, description: 'id Lesson' })
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly lessonId: number

  @ApiProperty({ example: 'title examination', description: 'string' })
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly title: string

  @ApiProperty({
    example: 'description examination',
    description: 'description'
  })
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string

  @ApiProperty({
    type: ComplexCreateQuestionDto,
    isArray: true
  })
  // @MinLength(1)
  @IsArray({ message: ConstraintMessagesConstants.MustBeDate })
  //@ValidateNested({ each: true })
  readonly questions: ComplexCreateQuestionDto[]
}
