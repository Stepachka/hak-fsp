import { ApiProperty } from '@nestjs/swagger'
import { IPagingOptions } from './'
import { PagingOptionsType } from './paging-options.interface'

export type IPaging<T> = {
  pagingOptions: IPagingOptions
  totalItems: number
  totalPages: number
  items: T[]
}

export class PagingType<T> implements IPaging<T> {
  @ApiProperty({ type: PagingOptionsType })
  pagingOptions: IPagingOptions

  @ApiProperty({ example: 15, description: 'count items' })
  totalItems: number

  @ApiProperty({
    example: 2,
    description: 'count pages by page size (default: 10)'
  })
  totalPages: number

  items: T[]
}
