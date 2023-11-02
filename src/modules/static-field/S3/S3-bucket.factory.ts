import EasyYandexS3 from 'easy-yandex-s3'
import { ApiConfigService } from '../../../core/modules/shared/services/api-config.service'

export const S3BucketFactory = (config: ApiConfigService): EasyYandexS3 =>
  new EasyYandexS3({
    auth: config.S3AccessConfig,
    Bucket: 'it-hub',
    debug: config.isDevelopment
  })
