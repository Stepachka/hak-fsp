import { ClassConstructor } from 'class-transformer'
import { Query } from 'express-serve-static-core'
import { Op, WhereOptions } from 'sequelize'
import { Model, Repository } from 'sequelize-typescript'
import {
  ConstraintMessagesConstants,
  ErrorMessagesConstants
} from 'src/core/constants'
import { QueryNamingConventionConstants } from 'src/core/constants/query-naming-convention.constants'
import { BadRequestException } from 'src/core/exceptions/build-in'
import { ReadFilter } from 'src/core/interfaces/common'
import { validateByDto } from 'src/core/validators'

const transformBoolean = (value: 'true' | 'false'): boolean => value != 'false'

export const transformQueryFilter = <T extends Model<T, any>>(
  query: Query,
  model: Repository<T>
): ReadFilter[] => {
  if (!Object.keys(query).length) return []
  return Object.entries(query).map(([key, value]) => {
    const [filterBy, conventionType] = key.toString().split('.')
    if (
      !conventionType ||
      !Object.values(QueryNamingConventionConstants).includes(
        conventionType as QueryNamingConventionConstants
      )
    )
      throw new BadRequestException(
        ErrorMessagesConstants.BadRequest,
        `Invalid query parameter: ${key}, by convention available only: ${Object.values(
          QueryNamingConventionConstants
        )}`
      )
    if (!model.rawAttributes[filterBy])
      throw new BadRequestException(
        ErrorMessagesConstants.BadRequest,
        `Invalid query parameter: ${key}, model not exist field ${key}`
      )

    return {
      key: filterBy,
      value: value as string,
      filterType: conventionType as QueryNamingConventionConstants
    }
  })
}

const getOperationByConventionConstant = (
  constant: QueryNamingConventionConstants
) => {
  switch (constant) {
    case QueryNamingConventionConstants.Equal:
      return Op.eq
    case QueryNamingConventionConstants.NotEqual:
      return Op.ne
    case QueryNamingConventionConstants.Like:
      return Op.iLike
    case QueryNamingConventionConstants.NotLike:
      return Op.notILike
    case QueryNamingConventionConstants.GreaterThan:
      return Op.gt
    case QueryNamingConventionConstants.GreaterThanOrEqual:
      return Op.gte
    case QueryNamingConventionConstants.LessThan:
      return Op.lt
    case QueryNamingConventionConstants.LessThanOrEqual:
      return Op.lte
    default:
      return Op.eq
  }
}

const transformQueryValueByOperationType = (
  value: string | number | boolean,
  operationType: QueryNamingConventionConstants
): string | number | boolean => {
  if (value == 'true' || value == 'false') return transformBoolean(value)
  switch (operationType) {
    case QueryNamingConventionConstants.Equal:
    case QueryNamingConventionConstants.NotEqual:
      return Number.isNaN(Number(value)) ? value : Number(value)
    case QueryNamingConventionConstants.Like:
    case QueryNamingConventionConstants.NotLike:
      return `%${value}%`
    case QueryNamingConventionConstants.GreaterThan:
    case QueryNamingConventionConstants.GreaterThanOrEqual:
    case QueryNamingConventionConstants.LessThan:
    case QueryNamingConventionConstants.LessThanOrEqual: {
      if (Number.isNaN(Number(value)))
        throw new BadRequestException(
          ConstraintMessagesConstants.MustBeNumber,
          `Invalid query value: ${value}`
        )
      return Number(value)
    }
    default:
      return value
  }
}

export const transformReadFilter = async (
  readFilters: ReadFilter[],
  dto: ClassConstructor<any>
): Promise<WhereOptions> => {
  const withTransformedValue = readFilters.map(item => ({
    ...item,
    value: transformQueryValueByOperationType(item.value, item.filterType)
  }))
  await validateByDto(
    dto,
    Object.assign(
      {},
      ...withTransformedValue.map(readFilter => ({
        [readFilter.key]: readFilter.value
      }))
    ),
    {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true
    }
  )

  return Object.assign(
    {},
    ...withTransformedValue.map(filter => ({
      [filter.key]: {
        [getOperationByConventionConstant(filter.filterType)]: filter.value
      }
    }))
  )
}
