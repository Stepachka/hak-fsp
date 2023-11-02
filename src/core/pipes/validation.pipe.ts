import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/custom'
import { TransformValidateErrorHelper } from '../helpers/transform-validate-error.helper'

@Injectable()
export class ErrorsValidationPipe implements PipeTransform {
  private static JsNativeTypes: Function[] = [
    String,
    Boolean,
    Number,
    Symbol,
    Array,
    Object
  ]

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) return value

    const target = plainToInstance(metatype, value)
    const errors = await validate(target, {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })

    if (errors.length)
      throw new ValidationException(
        TransformValidateErrorHelper.transformErrors(errors)
      )

    return value
  }

  private toValidate(metatype: Function): boolean {
    return !ErrorsValidationPipe.JsNativeTypes.includes(metatype)
  }
}
