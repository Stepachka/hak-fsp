import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { CreateStaticFieldAttributes } from './static-field.attributes'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../User/user.model'

@Table({
  tableName: 'StaticField'
})
export class StaticField extends Model<
  StaticField,
  CreateStaticFieldAttributes
> {
  @ApiProperty({ example: 1, description: 'id of static field' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'ba5bb60d-8691-428a-9001-488b7c81884dwebp',
    description: 'generated name + ext of file'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  readonly name: string

  @ApiProperty({
    example: 'avatar',
    description: 'original name of file'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  readonly originalname: string

  @ApiProperty({
    example: 'image/webp',
    description: 'extension of file'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  readonly type: string

  @ApiProperty({
    example: 'https:\\r-journal.io/api/static/uploads/avatar.webp',
    description: 'url of static field'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  readonly url: string

  @HasMany(() => User, 'defaultAvatarId')
  readonly user?: User[]
}
