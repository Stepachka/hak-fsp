import { Query } from 'express-serve-static-core'
import { PagingConstants } from 'src/core/constants/paging.constants'
import { IPagingOptions, Order, OrderType } from 'src/core/interfaces/common'
import { Model, Repository } from 'sequelize-typescript'

export type TransformPagingType = {
  pagingOptions: IPagingOptions
  other: Query
}

const transformOrder = (
  transformValue: OrderType,
  defaultValue: OrderType
): OrderType => {
  return transformValue
    ? Object.values(Order).includes(transformValue)
      ? transformValue
      : defaultValue
    : defaultValue
}

const transformInt = (transformValue: string, defaultValue: number): number => {
  return transformValue
    ? Number.isNaN(parseInt(transformValue, 10))
      ? defaultValue
      : parseInt(transformValue as unknown as string, 10)
    : defaultValue
}

const transformOrderBy = <M extends Model<M, any>>(
  transformValue: string,
  defaultValue: string,
  model: Repository<M>
): string =>
  !(transformValue in model) || !transformValue ? defaultValue : transformValue

export const transformPagingOptions = <M extends Model<M, any>>(
  value: Query,
  model: Repository<M>
): TransformPagingType => {
  const { page, pageSize, order, orderBy, ...other } = value

  const transformedPage = transformInt(page as string, PagingConstants.Page)
  const transformedPageSize = transformInt(
    pageSize as string,
    PagingConstants.PageSize
  )
  const transformedOrder = transformOrder(order as OrderType, Order.desc)
  const transformedOrderBy = transformOrderBy(
    orderBy as string,
    'createdAt',
    model
  )

  return {
    pagingOptions: {
      page: transformedPage,
      pageSize: transformedPageSize,
      order: transformedOrder,
      orderBy: transformedOrderBy
    },
    other
  }
}
