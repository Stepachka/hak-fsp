import { Injectable } from '@nestjs/common'
import { BaseServiceCRUD } from '../../core/bases/services'
import { InjectModel } from '@nestjs/sequelize'
import { Lesson } from '../../database/models/singles/Lesson/lesson.model'
import { lessonInclude } from '../../database/includes/lesson'

@Injectable()
export class LessonService extends BaseServiceCRUD<Lesson> {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonRepository: typeof Lesson
  ) {
    super({
      autocompleteProperty: 'title',
      modelRepository: lessonRepository,
      includes: [lessonInclude]
    })
  }
}
