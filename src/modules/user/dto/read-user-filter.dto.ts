import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ConstraintMessagesConstants } from '../../../core/constants'

export class ReadUserFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly id: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 12)
  readonly nickname: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @Length(3, 15)
  readonly name: string

  @ApiProperty()
  @IsOptional()
  @IsString({ message: ConstraintMessagesConstants.MustBeString })
  @IsEmail({}, { message: ConstraintMessagesConstants.MustBeEmail })
  readonly email: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: ConstraintMessagesConstants.MustBeInteger })
  readonly roleId: number
}
