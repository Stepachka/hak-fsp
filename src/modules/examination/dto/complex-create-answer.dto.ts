import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ComplexCreateAnswerDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsBoolean({ message: ConstraintMessagesConstants.MustBeBoolean })
  readonly isRight: boolean
}
