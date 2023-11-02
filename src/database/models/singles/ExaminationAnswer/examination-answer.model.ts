import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateAnswerAttributes } from './examination-answer.attributes'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ExaminationQuestion } from '../ExaminationQuestion/examination-question.model'

@Table({ tableName: 'ExaminationAnswer' })
export class ExaminationAnswer extends Model<
  ExaminationAnswer,
  CreateAnswerAttributes
> {
  @ApiProperty({ example: 1, description: 'id of examinationQuestions-answer' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: '1024',
    description: 'examinationQuestions-answer of examinationQuestions-question'
  })
  @Column({ allowNull: false, type: DataType.STRING })
  readonly name: string

  @ApiProperty({
    example: 1,
    description: 'FK of examinationQuestions-question'
  })
  @ForeignKey(() => ExaminationQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  readonly questionId: number

  @ApiPropertyOptional({
    type: () => ExaminationQuestion,
    description: 'question'
  })
  @BelongsTo(() => ExaminationQuestion, 'questionId')
  readonly question?: ExaminationQuestion

  @ApiProperty({
    example: true,
    description: 'field of right of examinationQuestions-answer'
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  readonly isRight: boolean
}
