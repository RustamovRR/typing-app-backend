import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { AuthProvidersType } from 'src/common/types'

export class UserEntity implements User {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  email: string

  @Exclude()
  @ApiProperty({ required: false, nullable: true })
  password: string

  @Expose()
  @ApiProperty()
  provider: AuthProvidersType

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  updatedAt: Date

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  fullName: string | null

  @Expose()
  @ApiProperty()
  username: string

  @Expose()
  @ApiProperty({ required: false, nullable: true })
  photo: string | null

  @Exclude()
  @IsOptional()
  accessToken: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
