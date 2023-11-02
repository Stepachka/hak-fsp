import { Includeable, WhereOptions } from 'sequelize'
import { Model, Repository } from 'sequelize-typescript'
import { IAutocomplete, IPaging, IPagingOptions, Order } from '../../common'
import { Nullable } from '../../../types'
import { BaseException } from '../../../exceptions/base.exception'

export interface IConfigServiceRead<T extends Model<T, any>> {
  modelRepository: Repository<T>
  autocompleteProperty: string
  includes?: Includeable[]
  whereOpts?: WhereOptions<T>
  orderOpts?: Array<[string, Order]>
  whereOptsFactory?: () => WhereOptions
}

export abstract class BaseServiceRead<T extends Model<T, any>> {
  protected constructor(protected readonly config: IConfigServiceRead<T>) {}
  abstract getById(id: number): Promise<T>
  abstract getAll(
    pagingOptions: IPagingOptions,
    filterOpts: WhereOptions
  ): Promise<IPaging<T>>
  abstract autocomplete(
    opts: IPagingOptions,
    filterOpts: WhereOptions
  ): Promise<IPaging<IAutocomplete>>
  abstract getOne(
    whereOpts: WhereOptions<T>,
    includes: Includeable[] | undefined,
    rejectOnEmpty: Nullable<BaseException>
  ): Promise<T>
}
