import {
  ValidationErrorType as CustomValidationError,
  ValidationMessageType
} from '../exceptions/types/validation.types'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

export class TransformValidateErrorHelper {
  public static transformErrors(
    errors: ValidationError[]
  ): CustomValidationError[] {
    return errors.map(
      ({ property, constraints }) =>
        new CustomValidationError(
          property,
          Object.keys(constraints ?? {}).map(
            key => new ValidationMessageType(constraints?.[key])
          )
        )
    )
  }
}
