import { Model } from 'sequelize-typescript'
import { MakeNullishOptional } from 'sequelize/types/utils'
import { BaseServiceRead, IConfigServiceRead } from './service-read.interface'

export interface IConfigServiceCRUD<T extends Model<T, any>>
  extends IConfigServiceRead<T> {}

export abstract class BaseServiceCRUD<
  T extends Model<T, any>
> extends BaseServiceRead<T> {
  protected constructor(protected readonly config: IConfigServiceCRUD<T>) {
    super(config)
  }
  abstract create(
    model: MakeNullishOptional<T['_creationAttributes']>
  ): Promise<T | null>
  abstract update(id: number, model: T | Partial<T>): Promise<T | null>
  abstract delete(id: number): Promise<number>
}
