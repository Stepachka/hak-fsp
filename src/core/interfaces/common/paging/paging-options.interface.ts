import { ApiPropertyOptional } from '@nestjs/swagger'
import { Order, OrderType } from '../order.type'

export interface IPagingOptions {
  page: number
  pageSize: number
  order: OrderType
  orderBy: string
}

export interface QueryOptionsWithPaging extends Partial<IPagingOptions> {}

export class PagingOptionsType implements IPagingOptions {
  @ApiPropertyOptional({
    example: 1,
    description: 'number of page',
    default: 1
  })
  page: number

  @ApiPropertyOptional({
    example: 10,
    description: 'count items of page',
    default: 10
  })
  pageSize: number

  @ApiPropertyOptional({
    example: Order.desc,
    description: 'oder for sorting (asc | desc)',
    default: Order.desc
  })
  order: OrderType

  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'filed for ordering',
    default: 'createdAt'
  })
  orderBy: string
}
