export interface BaseExceptionResponseType<T> {
  message: string
  internalMessage?: string
  messages?: T[]
}
