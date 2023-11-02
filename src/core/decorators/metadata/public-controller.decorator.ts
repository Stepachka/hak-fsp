import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = Symbol('IsPublic')

export const IsPublic = (value = true) => SetMetadata(IS_PUBLIC_KEY, value)
