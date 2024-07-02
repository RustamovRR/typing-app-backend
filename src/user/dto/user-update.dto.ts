import { AuthProvidersType, EAuthProviders } from 'src/common/types'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
