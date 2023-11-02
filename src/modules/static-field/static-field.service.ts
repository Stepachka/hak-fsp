import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { BaseServiceRead } from '../../core/bases/services'
import { CreateStaticFieldAttributes } from '../../database/models/singles/StaticField/static-field.attributes'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import {
  InternalServerErrorException,
  NotFoundException
} from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'
import { defaultAvatarNames } from './constants/default-avatars.contants'
import { defaultPagingOptions } from '../../core/bases/utils'
import EasyYandexS3 from 'easy-yandex-s3'
import { S3BucketFactory } from './S3/S3-bucket.factory'
import { S3 } from 'aws-sdk'
import { CloudFoldersConstants } from './S3/cloud-folders.constants'

@Injectable()
export class StaticFieldService extends BaseServiceRead<StaticField> {
  private client: EasyYandexS3

  constructor(
    @InjectModel(StaticField)
    private readonly staticFieldRepository: typeof StaticField,
    private readonly configService: ApiConfigService
  ) {
    super({
      modelRepository: staticFieldRepository,
      autocompleteProperty: 'url'
    })

    this.client = S3BucketFactory(configService)
  }

  async getByName(name: string) {
    return this.staticFieldRepository.findOne({ where: { name } })
  }

  async getDefaultsAvatars() {
    return this.getAll(
      { ...defaultPagingOptions, pageSize: 30 },
      {
        name: defaultAvatarNames
      }
    )
  }

  async create(dto: CreateStaticFieldAttributes) {
    return this.staticFieldRepository.create(dto)
  }

  async upload(
    buffer: Buffer,
    fileDto:
      | Omit<CreateStaticFieldAttributes, 'url'>
      | CreateStaticFieldAttributes,
    bucket: CloudFoldersConstants = CloudFoldersConstants.UPLOADS
  ): Promise<S3.ManagedUpload.SendData> {
    const uploaded = await this.client.Upload(
      {
        buffer: buffer,
        name: fileDto.name
      },
      `/${bucket}`
    )
    if (uploaded == false)
      throw new InternalServerErrorException(
        ErrorMessagesConstants.InternalError,
        'Fail upload file'
      )
    return uploaded as S3.ManagedUpload.SendData
  }

  async delete(id: number) {
    const target = await this.staticFieldRepository.findOne({ where: { id } })
    if (!target)
      throw new NotFoundException(
        ErrorMessagesConstants.NotFound,
        'No such static-field'
      )
    await this.deleteFromStorage(target.name)
    return await this.staticFieldRepository.destroy({ where: { id } })
  }

  private async deleteFromStorage(name: string) {
    const result = await this.client.Remove(
      CloudFoldersConstants.UPLOADS + '/' + name
    )
    if (result != true)
      throw new InternalServerErrorException(
        ErrorMessagesConstants.InternalError,
        'Fail remove file'
      )
  }
}
