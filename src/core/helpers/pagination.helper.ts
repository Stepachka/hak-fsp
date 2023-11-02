import { IPaging, IPagingOptions } from '../interfaces/common'
import { DbPaginationOptions } from './types'

export class PaginationHelper {
  public static genPagingOpts(
    initialPagingOpts: IPagingOptions
  ): DbPaginationOptions {
    return {
      limit: initialPagingOpts.pageSize,
      offset: PaginationHelper.getOffset(
        initialPagingOpts.page,
        initialPagingOpts.pageSize
      )
    }
  }

  public static mapToIPaging<T>(
    count: number,
    data: T[],
    opts: IPagingOptions
  ): IPaging<T> {
    return {
      items: data,
      totalItems: count,
      pagingOptions: opts,
      totalPages: PaginationHelper.getTotalPages(count, opts.pageSize)
    }
  }

  private static getTotalPages(totalItems: number, pageSize: number) {
    return Math.ceil(totalItems / pageSize)
  }

  private static getOffset(page: number, pageSize: number): number {
    return page * pageSize - pageSize
  }
}
