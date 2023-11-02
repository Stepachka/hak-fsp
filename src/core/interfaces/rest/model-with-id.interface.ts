import { Model } from 'sequelize-typescript'

export interface ModelWithId {
  readonly id?: number
}

export interface ORMModelWithId extends Model {
  readonly id?: number
}
