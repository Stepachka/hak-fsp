import { UnprocessableEntityException } from '../../../core/exceptions/build-in'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import {
  ErrorMessagesConstants,
  InternalConfigurationConstants
} from '../../../core/constants'

export const MulterAdapter: MulterOptions = {
  fileFilter: (_, file: Express.Multer.File, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
      return cb(
        new UnprocessableEntityException(
          ErrorMessagesConstants.ValidationError
        ),
        false
      )

    return cb(null, true)
  },
  limits: { fileSize: InternalConfigurationConstants.LimitImageSize as number }
}
