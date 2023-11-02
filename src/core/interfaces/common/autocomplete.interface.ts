import { ApiProperty } from '@nestjs/swagger'

export interface IAutocomplete {
  id: number
  text: string
}

export class AutoCompleteType implements IAutocomplete {
  @ApiProperty({ example: 1, description: 'id of role' })
  id: number

  @ApiProperty({
    example: 'name',
    description: 'mapped priority attribute to text field name'
  })
  text: string
}
