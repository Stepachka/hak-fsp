import ms from 'ms'
import { Injectable } from '@nestjs/common'
import { ApiConfigService } from './api-config.service'

@Injectable()
export class DateService {
  constructor(private readonly configService: ApiConfigService) {}

  public ms(value: number, options?: { long: boolean }): string
  public ms(value: string): number
  public ms(value: any, options?: { long: boolean }): any {
    return ms(value, options)
  }

  public createExpiresDate(duration: string, dateStart?: Date) {
    return new Date((dateStart?.getTime() ?? Date.now()) + this.ms(duration))
  }
}
