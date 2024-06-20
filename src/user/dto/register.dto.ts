import { AuthProvidersType } from 'src/common/types'
import { UserLoginDto } from './login.dto'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserRegisterDto implements UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string

  @IsOptional()
  @ApiProperty()
  username?: string

  @IsOptional()
  @ApiProperty()
  fullName?: string

  @IsOptional()
  @ApiProperty()
  photo?: string

  @IsOptional()
  @ApiProperty()
  provider: AuthProvidersType
}
