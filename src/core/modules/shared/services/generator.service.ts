import { v4 as uuid, V4Options } from 'uuid'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GeneratorService {
  public uuid(options?: V4Options): string {
    return uuid(options)
  }

  public fileName(ext: string): string {
    return `${this.uuid()}${ext}`
  }

  public integer(range: [number, number]) {
    const min = Math.ceil(range[0])
    const max = Math.floor(range[1])
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
