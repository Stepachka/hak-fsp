import { HttpStatus } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ValidationErrorType } from '../../exceptions/types/validation.types'

export class BaseProcessedError {
  @ApiProperty()
  statusCode: HttpStatus
  @ApiPropertyOptional()
  message?: string
  @ApiPropertyOptional()
  messages?: ValidationErrorType[]
  @ApiPropertyOptional()
  internalMessage: string
  @ApiPropertyOptional()
  timestamp: string
  @ApiPropertyOptional()
  path: string
}

export class ProcessedError400Type implements BaseProcessedError {
  @ApiProperty({ example: 400, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'notifier:error.api.bad_request',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    type: ValidationErrorType,
    isArray: true
  })
  messages: ValidationErrorType[]

  @ApiProperty({
    example:
      'Invalid query parameter:  by convention available only: eq,ne,like,notLike,gt,gte,lt,lte',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}

export class ProcessedError401Type implements BaseProcessedError {
  @ApiProperty({ example: 401, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'notifier:error.api.unauthorized',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example: 'Invalid token',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/auth/login',
    description: 'url of this request'
  })
  path: string
}

export class ProcessedError404Type implements BaseProcessedError {
  @ApiProperty({ example: 404, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'error:error.api.not_found',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example: 'No such Role',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}

export class ProcessedError500Type implements BaseProcessedError {
  @ApiProperty({ example: 500, description: 'http status of request' })
  statusCode: HttpStatus

  @ApiProperty({
    example: 'notifier:error.api.internal_server_error',
    description: 'JSON i18n key of error for toast in client '
  })
  message: string

  @ApiProperty({
    example: 'Something went wrong',
    description: 'internal error from api'
  })
  internalMessage: string

  @ApiProperty({
    example: '2023-08-19T17:42:15.033Z',
    description: 'date of request error in ISO format'
  })
  timestamp: string

  @ApiProperty({
    example: '/api/role/',
    description: 'url of this request'
  })
  path: string
}
