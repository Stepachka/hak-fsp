import { ClassConstructor } from 'class-transformer'
import { Model } from 'sequelize-typescript'
import { BaseServiceCRUD } from '../services'
import {
  BaseControllerRead,
  IConfigControllerRead,
  IControllerReadPrivacySettings
} from './controller-read.interface'
import { Roles } from '../../common'
import { IModelInfo } from '../../../decorators'

export interface IControllerCRUDPrivacySettings
  extends IControllerReadPrivacySettings {
  createIsPublic?: boolean
  updateIsPublic?: boolean
  deleteIsPublic?: boolean
  createRequireRoles?: Roles[]
  updateRequireRoles?: Roles[]
  deleteRequireRoles?: Roles[]
  checkPermissionForUpdateInfo?: IModelInfo
}

export interface IConfigControllerCRUD<M extends Model<M, any>>
  extends Omit<IConfigControllerRead<M>, 'privacySettings'> {
  privacySettings?: IControllerCRUDPrivacySettings
  createDto: ClassConstructor<Object>
  updateDto: ClassConstructor<Object>
  updatePartiallyDto: ClassConstructor<Object>
}

export abstract class BaseControllerCRUD<
  T extends Model<T, any>
> extends BaseControllerRead<T> {
  protected constructor(protected readonly service: BaseServiceCRUD<T>) {
    super(service)
  }
  abstract create(dto: T): Promise<T | null>
  abstract update(id: number, dto: T): Promise<T | null>
  abstract updatePartially(id: number, dto: Partial<T>): Promise<T | null>
  abstract delete(id: number): Promise<boolean>
}
