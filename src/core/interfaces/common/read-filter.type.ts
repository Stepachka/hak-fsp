import { QueryNamingConventionConstants } from 'src/core/constants/query-naming-convention.constants'

export type ReadFilter = {
  key: string
  filterType: QueryNamingConventionConstants
  value: number | string | boolean
}
