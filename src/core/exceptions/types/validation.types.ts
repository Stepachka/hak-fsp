import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ValidationMessageType {
  constructor(message?: string) {
    this.message = message
  }
  @ApiPropertyOptional()
  message?: string
}

export class ValidationErrorType {
  constructor(target: string, messages: ValidationMessageType[]) {
    this.target = target
    this.messages = messages
  }

  @ApiProperty()
  target: string
  @ApiProperty({
    type: ValidationMessageType,
    isArray: true
  })
  messages: ValidationMessageType[]
}
