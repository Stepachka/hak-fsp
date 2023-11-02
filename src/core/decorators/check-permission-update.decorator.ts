import { IModelInfo, ModelInfo } from './metadata/model-info.decorator'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { CheckPermissionForUpdateGuard } from '../guards'

export const CheckPermissionUpdate = (modelInfo?: IModelInfo) =>
  applyDecorators(
    ModelInfo(modelInfo),
    UseGuards(CheckPermissionForUpdateGuard)
  )
