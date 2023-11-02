import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { buildBaseControllerRead } from '../../core/bases/controllers'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { ImageUploadDto, ReadStaticFieldFilterDto } from './dto'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { StaticFieldService } from './static-field.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProcessedError500Type } from '../../core/interfaces/common/processed-error.type'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { ImageProcessPipe, UploadProcessed } from './pipes/image-process.pipe'
import { Get } from '@nestjs/common/decorators'
import { PagingType } from '../../core/interfaces/common/paging'
import { PagingOptionsType } from '../../core/interfaces/common/paging/paging-options.interface'
import { EditorImageDto } from './dto/editor-image.dto'
import { CloudFoldersConstants } from './S3/cloud-folders.constants'

const baseController = buildBaseControllerRead<StaticField>({
  filterDto: ReadStaticFieldFilterDto,
  swagger: { model: StaticField, modelName: 'StaticField' }
})

@ApiExtraModels(ImageUploadDto, ReadStaticFieldFilterDto, EditorImageDto)
@ApiTags('StaticField')
@Controller('static-field')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class StaticFieldController extends baseController {
  constructor(private readonly staticFieldService: StaticFieldService) {
    super(staticFieldService)
  }

  @ApiOperation({ summary: `Upload image & create StaticField model` })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(StaticField) }
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @ApiBody({
    description: 'Image form-data',
    type: ImageUploadDto
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async upload(@UploadedFile(ImageProcessPipe) image: UploadProcessed) {
    const { Location } = await this.staticFieldService.upload(
      image.buffer,
      image.dto
    )
    return this.staticFieldService.create({ ...image.dto, url: Location })
  }

  @ApiOperation({
    summary: `Upload image from editor js plugin & create StaticField model`
  })
  @ApiOkResponse({
    status: 200,
    schema: { $ref: getSchemaPath(EditorImageDto) }
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @ApiBody({
    description: 'Image form-data',
    type: ImageUploadDto
  })
  @ApiConsumes('multipart/form-data')
  @Post('editor-js')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadFromEditor(
    @UploadedFile(ImageProcessPipe) image: UploadProcessed
  ) {
    const { Location } = await this.staticFieldService.upload(
      image.buffer,
      image.dto,
      CloudFoldersConstants.EDITORJS
    )

    const staticField = await this.staticFieldService.create({
      ...image.dto,
      url: Location
    })

    return {
      success: 1,
      file: staticField
    }
  }

  @ApiOperation({ summary: 'Delete model by id' })
  @ApiOkResponse({
    status: 200,
    type: 'boolean'
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @Delete('/:id')
  public async delete(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number
  ) {
    const countDeleted = await this.staticFieldService.delete(id)
    return countDeleted == 1
  }

  @ApiOperation({ summary: 'Endpoint for get default avatars' })
  @ApiOkResponse({
    status: 200,
    schema: {
      allOf: [
        { $ref: getSchemaPath(PagingType) },
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(StaticField) }
            },
            pagingOptions: { $ref: getSchemaPath(PagingOptionsType) }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    status: 500,
    schema: {
      $ref: getSchemaPath(ProcessedError500Type)
    }
  })
  @Get('default-avatars')
  public async getDefaultAvatar() {
    return this.staticFieldService.getDefaultsAvatars()
  }
}
