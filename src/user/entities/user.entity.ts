import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class UserEntity implements User {
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @Exclude()
  @ApiProperty({ required: false, nullable: true })
  password: string

  @ApiProperty()
  provider: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, nullable: true })
  fullName: string | null

  @ApiProperty()
  username: string

  @ApiProperty({ required: false, nullable: true })
  photo: string | null

  @Exclude()
  @IsOptional()
  accessToken: string
}
