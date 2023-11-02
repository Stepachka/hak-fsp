import { ClassConstructor } from 'class-transformer'
import { Request } from 'express'
import { Model } from 'sequelize-typescript'
import { IAutocomplete, IPaging, Roles } from '../../common'
import { ModelWithId } from '../model-with-id.interface'
import { BaseServiceRead } from '../services'
import { ISwaggerReadControllerConfig } from '../swagger/swagger-controller-config.interface'

export interface IControllerReadPrivacySettings {
  getAllIsPublic?: boolean
  getByIdIsPublic?: boolean
  autocompleteIsPublic?: boolean
  getAllRequireRoles?: Roles[]
  getByIdRequireRoles?: Roles[]
  autocompleteRequireRoles?: Roles[]
}

export interface IConfigControllerRead<M extends Model<M, any>> {
  swagger: ISwaggerReadControllerConfig<M>
  privacySettings?: IControllerReadPrivacySettings // define auth requirers
  filterDto: ClassConstructor<ModelWithId>
}

export abstract class BaseControllerRead<T extends Model<T, any>> {
  protected constructor(protected readonly service: BaseServiceRead<T>) {}
  abstract getAll(req: Request): Promise<IPaging<T> | null>
  abstract autocomplete(req: Request): Promise<IPaging<IAutocomplete> | null>
  abstract getById(id: number): Promise<T | null>
}
