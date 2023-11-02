import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateLessonAttributes } from './lesson.attributes'
import { Examination } from '../Examination/examination.model'

@Table({ tableName: 'Lesson' })
export class Lesson extends Model<Lesson, CreateLessonAttributes> {
  @ApiProperty({ example: 1, description: 'id of lesson' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'Lesson to editor role',
    description: 'Title of Lesson'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly title: string

  @ApiProperty({
    example: 'To get the role of editor, take the Lesson',
    description: 'Description of Lesson'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly description: string

  @ApiPropertyOptional({
    description: 'lesson of exam',
    type: () => Lesson,
    isArray: true
  })
  @HasMany(() => Examination, 'lessonId')
  readonly examinations?: Examination[]
}
