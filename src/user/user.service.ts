import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthProvidersType, LanguageType } from 'src/common/types'
import { getErrorMessage } from 'src/common/utils'
import { UserRegisterDto } from './dto'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    })

    return user
  }

  async getUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createUser(data: UserRegisterDto, provider: AuthProvidersType = 'local'): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...data,
        username: data.email.split('@')[0],
        provider,
      },
    })
  }

  async findOrCreate(data: UserRegisterDto, provider: AuthProvidersType): Promise<User> {
    let user = await this.getUser({ email: data.email.toLowerCase() })
    if (!user) {
      user = await this.createUser(data, provider)
    }
    return user
  }

  async updateUser(
    params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput },
    lang: LanguageType,
  ): Promise<User> {
    const { where, data } = params

    const user = await this.getUser({ id: Number(where.id) })

    if (!user) {
      throw new ConflictException({
        status: false,
        statusCode: HttpStatus.NOT_FOUND,
        ...getErrorMessage('USER_NOT_FOUND', lang),
      })
    }

    if (data.username) {
      const existingUserWithSameUsername = await this.prismaService.user.findUnique({
        where: { username: String(data.username).toLowerCase() },
      })

      if (existingUserWithSameUsername && existingUserWithSameUsername.id !== user.id) {
        throw new ConflictException({
          status: false,
          statusCode: HttpStatus.CONFLICT,
          ...getErrorMessage('USERNAME_ALREADY_EXISTS', lang),
        })
      }
    }

    return this.prismaService.user.update({
      where,
      data,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({
      where,
    })
  }
}
