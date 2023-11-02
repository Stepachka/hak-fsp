import sharp from 'sharp'
import { Injectable, PipeTransform } from '@nestjs/common'
import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'
import { CreateStaticFieldAttributes } from '../../../database/models/singles/StaticField/static-field.attributes'
import { GeneratorService } from '../../../core/modules/shared/services/generator.service'

export interface UploadProcessed {
  dto: Omit<CreateStaticFieldAttributes, 'url'>
  buffer: Buffer
}

@Injectable()
export class ImageProcessPipe
  implements PipeTransform<Express.Multer.File, Promise<UploadProcessed>>
{
  constructor(
    private readonly configService: ApiConfigService,
    private readonly generatorService: GeneratorService
  ) {}

  async transform(image: Express.Multer.File): Promise<UploadProcessed> {
    const name = this.generatorService.fileName('.webp')

    const buffer = await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 6 })
      .toBuffer()

    return {
      dto: {
        name,
        originalname: image.originalname,
        type: image.mimetype
      },
      buffer
    }
  }
}
