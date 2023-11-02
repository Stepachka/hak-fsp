import { registerDecorator, ValidationOptions } from 'class-validator'
import { Sequelize } from 'sequelize-typescript'
import {
  BaseUniqueValidator,
  UniqueConstrainsArguments
} from '../validators/bases/base-unique.validator'
export { UniqueValidator } from '../validators/unique.validator'

export function IsUnique(
  validator: new (connection: Sequelize) => BaseUniqueValidator,
  constraints: UniqueConstrainsArguments,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints,
      validator
    })
  }
}
