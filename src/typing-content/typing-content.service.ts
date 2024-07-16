import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { LanguageType } from 'src/common/types'
import { getErrorMessage } from 'src/common/utils'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateTypingContentDto } from './dto/update-typing-content.dto'
import { TypingContentEntity } from './entities/typing-content.entity'

@Injectable()
export class TypingContentService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TypingContentCreateInput): Promise<TypingContentEntity> {
    return this.prismaService.typingContent.create({
      data,
    })
  }

  async findAll(): Promise<TypingContentEntity[]> {
    return this.prismaService.typingContent.findMany()
  }

  async findOne(uniqueInput: Prisma.TypingContentWhereUniqueInput): Promise<TypingContentEntity> {
    return this.prismaService.typingContent.findUnique({
      where: uniqueInput,
    })
  }

  async update(
    params: { where: Prisma.TypingContentWhereUniqueInput; data: UpdateTypingContentDto },
    lang: LanguageType,
  ): Promise<TypingContentEntity> {
    const { where, data } = params

    const typingContent = await this.findOne({ id: +where.id })

    if (!typingContent) {
      throw new ConflictException({
        status: false,
        statusCode: HttpStatus.CONFLICT,
        ...getErrorMessage('TYPING_CONTENT_ALREADY_EXISTS', lang),
      })
    }

    const updatedTypingContent = await this.prismaService.typingContent.update({
      where,
      data,
    })

    return updatedTypingContent
  }

  async remove(id: number): Promise<TypingContentEntity> {
    return this.prismaService.typingContent.delete({
      where: { id },
    })
  }
}
