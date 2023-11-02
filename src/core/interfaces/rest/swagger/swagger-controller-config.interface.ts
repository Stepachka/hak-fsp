import { ClassConstructor } from 'class-transformer'
import { Model, Repository } from 'sequelize-typescript'
import { ModelWithId } from '../model-with-id.interface'

export interface ISwaggerReadControllerConfig<M extends Model<M, any>> {
  modelName: string
  model: Repository<M>
}

export interface ISwaggerReadShortControllerConfig<M extends Model<M, any>>
  extends ISwaggerReadControllerConfig<M> {
  shortModel: ClassConstructor<ModelWithId>
}
