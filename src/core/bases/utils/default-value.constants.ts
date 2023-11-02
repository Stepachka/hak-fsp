import { IPagingOptions, Order } from '../../interfaces/common'

export const defaultPagingOptions: IPagingOptions = {
  order: Order.desc,
  pageSize: 10,
  page: 1,
  orderBy: 'createdAt'
}
