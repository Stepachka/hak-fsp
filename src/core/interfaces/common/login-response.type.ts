import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../../database/models/singles/User/user.model'

export class LoginResponseType {
  @ApiProperty()
  access: string
  @ApiProperty()
  user: User
}
