import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, TypingContent } from '@prisma/client'

@Injectable()
export class TypingContentService {
  constructor(private prismaService: PrismaService) {}

  async createTypingContent(data: Prisma.TypingContentCreateInput): Promise<TypingContent> {
    return this.prismaService.typingContent.create({
      data,
    })
  }

  async getTypingContents(): Promise<TypingContent[]> {
    return this.prismaService.typingContent.findMany()
  }

  async getTypingContentById(id: number): Promise<TypingContent | null> {
    return this.prismaService.typingContent.findUnique({
      where: { id },
    })
  }

  async updateTypingContent(id: number, data: Prisma.TypingContentCreateInput): Promise<TypingContent> {
    return this.prismaService.typingContent.update({
      where: { id },
      data,
    })
  }

  async deleteTypingContent(id: number): Promise<TypingContent> {
    return this.prismaService.typingContent.delete({
      where: { id },
    })
  }
}
