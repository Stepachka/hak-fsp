import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidatorOptions } from 'class-validator'
import { ValidationException } from '../exceptions/custom'
import { TransformValidateErrorHelper } from '../helpers/transform-validate-error.helper'

export const validateByDto = async <T extends ClassConstructor<any>>(
  dto: T,
  validatedObj: Object,
  opts?: ValidatorOptions
) => {
  const plannedClass = plainToInstance(dto, validatedObj)
  const errors = await validate(plannedClass, opts)
  if (errors.length)
    throw new ValidationException(
      TransformValidateErrorHelper.transformErrors(errors)
    )

  return dto
}
