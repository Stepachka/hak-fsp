import {
  ValidationArguments,
  ValidatorConstraintInterface
} from 'class-validator'
import { Model, Sequelize } from 'sequelize-typescript'

export type UniqueConstrainsArguments = [new () => Model]

export interface IUniqueValidationArguments {
  constrains: UniqueConstrainsArguments
}

export abstract class BaseUniqueValidator
  implements ValidatorConstraintInterface
{
  protected constructor(protected readonly connection: Sequelize) {}

  public async validate(
    value: any,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    const [EntityClass] = validationArguments?.constraints
    const entitiesCount = await this.connection
      .getRepository(EntityClass)
      .count({ where: { [validationArguments.property]: value } })
    return entitiesCount <= 0
  }

  public defaultMessage(validationArguments: ValidationArguments): string {
    const [EntityClass] = validationArguments?.constraints
    const entity = EntityClass.name || 'Entity'
    return `${entity}.not_unique.${validationArguments?.property}`
  }
}
