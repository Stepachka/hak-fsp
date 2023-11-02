import { Injectable } from '@nestjs/common'

@Injectable()
export class UrlService {
  public createUri(base: string | URL, url: string | URL) {
    return new URL(url, base)
  }
}
