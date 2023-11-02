import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class CreateExaminationDto {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly title: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly description: string

  @ApiProperty()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly certificateRoleId: string
}
