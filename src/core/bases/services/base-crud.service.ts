import { Model } from 'sequelize-typescript'
import { MakeNullishOptional } from 'sequelize/types/utils'
import {
  BaseServiceCRUD as AbstractServiceCRUD,
  IConfigServiceCRUD
} from '../../interfaces/rest/services'
import { BaseServiceRead } from './base-read.service'
import { ORMModelWithId } from '../../interfaces/rest/model-with-id.interface'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export abstract class BaseServiceCRUD<T extends Model<T, any>>
  extends BaseServiceRead<T>
  implements AbstractServiceCRUD<T>
{
  protected constructor(protected readonly config: IConfigServiceCRUD<T>) {
    super(config)
  }

  public async create(model: MakeNullishOptional<T['_creationAttributes']>) {
    console.log('model')
    return this.config.modelRepository.create(model)
  }

  public async update(
    idOrWhereOpts: number | Partial<T>,
    model: T | Partial<T>
  ) {
    return (
      await this.config.modelRepository.update<ORMModelWithId>(model, {
        where: {
          ...(typeof idOrWhereOpts == 'number'
            ? { id: idOrWhereOpts }
            : idOrWhereOpts)
        },
        returning: true
      })
    )[1][0] as unknown as T
  }

  public async delete(idOrWhereOpts: number | Partial<T>): Promise<number> {
    return this.config.modelRepository.destroy<ORMModelWithId>({
      where: {
        ...(typeof idOrWhereOpts == 'number'
          ? { id: idOrWhereOpts }
          : idOrWhereOpts)
      }
    })
  }
}
