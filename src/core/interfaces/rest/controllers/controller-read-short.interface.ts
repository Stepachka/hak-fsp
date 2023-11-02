import { ClassConstructor } from 'class-transformer'
import { Request } from 'express'
import { Model } from 'sequelize-typescript'
import { IAutocomplete, IPaging, Roles } from '../../common'
import { ModelWithId } from '../model-with-id.interface'
import { BaseServiceReadShort } from '../services'
import { ISwaggerReadShortControllerConfig } from '../swagger/swagger-controller-config.interface'

export interface IControllerReadShortPrivacySettings {
  getShortAllIsPublic?: boolean
  getShortByIdIsPublic?: boolean
  autocompleteIsPublic?: boolean
  getAllShortRequireRoles?: Roles[]
  getByIdShortRequireRoles?: Roles[]
  autocompleteShortRequireRoles?: Roles[]
}

export interface IConfigControllerReadShort<M extends Model<M, any>> {
  swagger: ISwaggerReadShortControllerConfig<M>
  privacySettings?: IControllerReadShortPrivacySettings // define auth requirers
  filterDto: ClassConstructor<ModelWithId>
}

export abstract class BaseControllerReadShort<
  T extends Model<T, any>,
  TShort extends ModelWithId
> {
  protected constructor(
    protected readonly service: BaseServiceReadShort<T, TShort>
  ) {}
  abstract getAll(req: Request): Promise<IPaging<TShort>>
  abstract autocomplete(req: Request): Promise<IPaging<IAutocomplete>>
  abstract getById(id: number): Promise<TShort>
}
