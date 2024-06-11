import { User } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { AuthProvidersType } from 'src/types'

export class UserAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string
}

export class CreateUserDto implements UserAuthDto {
  email: string
  password: string
  username?: string
  fullName?: string
  photo?: string
  provider: AuthProvidersType
}
export class UserReturnDto implements Omit<User, 'password'> {
  id: number
  username: string
  email: string
  fullName: string
  createdAt: Date
  updatedAt: Date
  accessToken: string
  provider: string
  photo: string
}
