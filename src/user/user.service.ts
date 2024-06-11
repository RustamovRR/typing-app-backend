import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from 'src/dto'
import { AuthProvidersType } from 'src/types'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    email = email.toLowerCase()
    if (!email) {
      console.warn('findOne was called without an email.')
      return undefined
    }
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: { id },
    })
  }

  async createUser(createUserDto: CreateUserDto, provider?: AuthProvidersType): Promise<User | undefined> {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        username: createUserDto.email.split('@')[0],
        provider,
      },
    })
  }

  async findOrCreate(createUserDto: CreateUserDto, provider?: AuthProvidersType): Promise<User> {
    let user = await this.findOne(createUserDto.email)
    if (!user) {
      user = await this.createUser(createUserDto, provider)
    }
    return user
  }
}
