import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/sequelize'
import { ValidatorConstraint } from 'class-validator'
import { Sequelize } from 'sequelize-typescript'
import { BaseUniqueValidator } from './bases/base-unique.validator'

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator extends BaseUniqueValidator {
  constructor(@InjectConnection() protected readonly connection: Sequelize) {
    super(connection)
  }
}
