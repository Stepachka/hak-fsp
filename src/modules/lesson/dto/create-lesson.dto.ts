import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateLessonDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly title: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string
}
