import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript'
import { CreateUserAttributes } from './user.attributes'
import { Role } from '../Role/role.model'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { InternalConfigurationConstants } from '../../../../core/constants'
import { UserAvatar } from '../../related/UserAvatar/user-avatar.model'
import { StaticField } from '../StaticField/static-field.model'

@Table({ tableName: 'User' })
export class User extends Model<User, CreateUserAttributes> {
  @ApiProperty({ example: 1, description: 'id of user' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  readonly id: number

  @ApiProperty({
    example: 'fishhher',
    description: 'nickname of user, len [3,12]'
  })
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
    validate: { len: [3, 12] }
  })
  readonly nickname: string

  @ApiProperty({ example: 'Denis', description: 'name of user, len [3,15]' })
  @Column({
    allowNull: false,
    type: DataType.STRING,
    validate: { len: [3, 15] }
  })
  readonly name: string

  @ApiProperty({
    example: 'rybkin.denis.94@gmail.com',
    description: 'email of user, should be unique'
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  readonly email: string

  @ApiProperty({
    example: '$2a$05$xqY4CUGu7DaJaELkmunOe.b4cJpSuzsAP3vSlusbU/Fg58c4Rtfgq',
    description: `hashed password of user, min length for for crete: ${InternalConfigurationConstants.MinPasswordLength}`
  })
  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  readonly password: string

  @ApiProperty({ example: 3, description: 'FK of Role model' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  readonly roleId: number

  @ApiPropertyOptional({
    description: 'Role model',
    type: Role
  })
  @BelongsTo(() => Role, 'roleId')
  readonly role?: Role

  @ApiProperty({
    example: 7,
    description: 'FK of StaticField model (default avatar)'
  })
  @ForeignKey(() => StaticField)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 7 })
  readonly defaultAvatarId: number

  @ApiPropertyOptional({
    description: 'default avatar',
    type: StaticField
  })
  @BelongsTo(() => StaticField, 'defaultAvatarId')
  readonly defaultAvatar: StaticField

  @ApiPropertyOptional({
    description: 'avatar',
    type: UserAvatar
  })
  @HasOne(() => UserAvatar, 'userId')
  readonly userAvatar?: UserAvatar
}
