import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { LanguageType } from 'src/common/types'
import { getErrorMessage } from 'src/common/utils'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateTypingContentCategoryDto } from './dto/update-typing-content-category.dto'
import { TypingContentCategoryEntity } from './entities/typing-content-category.entity'

@Injectable()
export class TypingContentCategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TypingContentCategoryCreateInput): Promise<TypingContentCategoryEntity> {
    return this.prismaService.typingContentCategory.create({ data })
  }

  async findAll(): Promise<TypingContentCategoryEntity[]> {
    return this.prismaService.typingContentCategory.findMany()
  }

  async findOne(uniqueInput: Prisma.TypingContentCategoryWhereUniqueInput): Promise<TypingContentCategoryEntity> {
    return this.prismaService.typingContentCategory.findUnique({
      where: uniqueInput,
    })
  }

  async update(
    params: { where: Prisma.TypingContentCategoryWhereUniqueInput; data: UpdateTypingContentCategoryDto },
    lang: LanguageType,
  ): Promise<TypingContentCategoryEntity> {
    const { where, data } = params

    const typingContent = await this.findOne({ id: +where.id })

    if (!typingContent) {
      throw new ConflictException({
        status: false,
        statusCode: HttpStatus.CONFLICT,
        ...getErrorMessage('TYPING_CONTENT_CATEGORY_ALREADY_EXISTS', lang),
      })
    }

    const updatedCategory = await this.prismaService.typingContentCategory.update({
      where,
      data,
    })

    return updatedCategory
  }

  async remove(id: number): Promise<TypingContentCategoryEntity> {
    return this.prismaService.typingContentCategory.delete({
      where: { id },
    })
  }
}
