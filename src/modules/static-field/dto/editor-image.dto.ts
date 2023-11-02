import { ApiProperty } from '@nestjs/swagger'
import { StaticField } from '../../../database/models/singles/StaticField/static-field.model'

export class EditorImageDto {
  @ApiProperty()
  readonly success: number

  @ApiProperty({ type: StaticField })
  readonly file: StaticField
}
