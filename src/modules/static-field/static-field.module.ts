import { Module } from '@nestjs/common'
import { StaticField } from '../../database/models/singles/StaticField/static-field.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { MulterModule } from '@nestjs/platform-express'
import { MulterAdapter } from './utils/multer.adapter'
import { StaticFieldService } from './static-field.service'
import { StaticFieldController } from './static-field.controller'

@Module({
  imports: [
    SequelizeModule.forFeature([StaticField]),
    MulterModule.register(MulterAdapter)
  ],
  providers: [StaticFieldService],
  controllers: [StaticFieldController],
  exports: [StaticFieldService]
})
export class StaticFieldModule {}
