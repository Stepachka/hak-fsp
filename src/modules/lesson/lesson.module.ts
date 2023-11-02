import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Lesson } from '../../database/models/singles/Lesson/lesson.model'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'

@Module({
  imports: [SequelizeModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
