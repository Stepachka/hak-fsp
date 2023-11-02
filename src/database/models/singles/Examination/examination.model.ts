import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateExaminationAttributes } from './examination.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ExaminationQuestion } from '../ExaminationQuestion/examination-question.model'
import { Lesson } from '../Lesson/lesson.model'

@Table({ tableName: 'Examination' })
export class Examination extends Model<
  Examination,
  CreateExaminationAttributes
> {
  @ApiProperty({ example: 1, description: 'id of examinationQuestions' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'Examination to editor role',
    description: 'Title of examinationQuestions'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly title: string

  @ApiProperty({
    example: 'To get the role of editor, take the examinationQuestions',
    description: 'Description of examinationQuestions'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly description: string

  @ApiPropertyOptional({
    type: () => Lesson,
    description: 'lesson'
  })
  @ForeignKey(() => Lesson)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly lessonId: number

  @ApiPropertyOptional({
    type: () => Lesson,
    description: 'question'
  })
  @BelongsTo(() => Lesson, 'lessonId')
  readonly lesson?: Lesson

  @ApiPropertyOptional({
    description: 'questions of exam',
    type: () => ExaminationQuestion,
    isArray: true
  })
  @HasMany(() => ExaminationQuestion, 'examinationId')
  readonly questions?: ExaminationQuestion[]
}
