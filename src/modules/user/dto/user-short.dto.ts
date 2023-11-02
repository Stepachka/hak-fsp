import { ModelWithId } from '../../../core/interfaces/rest/model-with-id.interface'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ConstraintMessagesConstants } from '../../../core/constants'
import { Role } from '../../../database/models/singles/Role/role.model'
import { StaticField } from '../../../database/models/singles/StaticField/static-field.model'
import { UserAvatar } from '../../../database/models/related/UserAvatar/user-avatar.model'

export class UserShortDto implements ModelWithId {
  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly nickname: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly name: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly email: string

  @ApiProperty()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly role: Role

  @ApiProperty({ type: StaticField })
  readonly defaultAvatar: StaticField

  @ApiPropertyOptional({
    type: UserAvatar
  })
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  readonly userAvatar?: UserAvatar
}
