import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserAvatarAttributes } from './user-avatar.attributes'
import { User } from '../../singles/User/user.model'
import { StaticField } from '../../singles/StaticField/static-field.model'
import { ApiProperty, getSchemaPath } from '@nestjs/swagger'

@Table({ tableName: 'UserAvatar' })
export class UserAvatar extends Model<UserAvatar, CreateUserAvatarAttributes> {
  @ApiProperty({ example: 1, description: 'id of user-avatar' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({ example: 1, description: 'FK to user' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly userId: number

  @ApiProperty({
    type: () => getSchemaPath(User),
    description: 'user'
  })
  @BelongsTo(() => User, 'userId')
  readonly user: User

  @ApiProperty({ example: 1, description: 'FK to static-field' })
  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  readonly staticFieldId: number

  @ApiProperty({
    allOf: [{ $ref: getSchemaPath(StaticField) }],
    description: 'avatar (static-field)'
  })
  @BelongsTo(() => StaticField, 'staticFieldId')
  readonly staticField: StaticField
}
