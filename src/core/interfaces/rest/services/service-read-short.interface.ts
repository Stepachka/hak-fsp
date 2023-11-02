import { WhereOptions } from 'sequelize'
import { Model } from 'sequelize-typescript'
import { BaseServiceRead } from 'src/core/bases/services'
import { IPaging, IPagingOptions } from '../../common'
import { ModelWithId } from '../model-with-id.interface'
import { IConfigServiceRead } from './service-read.interface'

export interface IConfigServiceReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
> extends IConfigServiceRead<T> {
  mapper: (fullModel: T) => TShort
}

export abstract class BaseServiceReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
> extends BaseServiceRead<T> {
  protected constructor(
    protected readonly config: IConfigServiceReadShort<T, TShort>
  ) {
    super(config)
  }
  abstract getShortById(id: number): Promise<TShort>
  abstract getAllShort(
    pagingOptions: IPagingOptions,
    filterOpts: WhereOptions
  ): Promise<IPaging<TShort>>
}
