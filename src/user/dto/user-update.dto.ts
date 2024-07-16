import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UserUpdateDto {
  @IsOptional()
  @ApiProperty()
  username?: string

  @IsOptional()
  @ApiProperty()
  fullName?: string

  @IsOptional()
  @ApiProperty()
  photo?: string
}
