import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { TypingContentService } from './typing-content.service'
import { TypingContent as TypingContentModel } from '@prisma/client'
import { Public } from 'src/constants'

@Public()
@Controller('api/typing-content')
export class TypingContentController {
  constructor(private readonly typingContentService: TypingContentService) {}

  @Post()
  async createTypingContent(@Body() data: TypingContentModel): Promise<TypingContentModel> {
    return this.typingContentService.createTypingContent(data)
  }

  @Get()
  async getTypingContents(): Promise<TypingContentModel[]> {
    return this.typingContentService.getTypingContents()
  }

  @Get(':id')
  async getTypingContentById(@Param('id') id: string): Promise<TypingContentModel> {
    return this.typingContentService.getTypingContentById(Number(id))
  }

  @Put(':id')
  async updateTypingContent(@Param('id') id: string, @Body() data: TypingContentModel): Promise<TypingContentModel> {
    return this.typingContentService.updateTypingContent(Number(id), data)
  }

  @Delete(':id')
  async deleteTypingContent(@Param('id') id: string): Promise<TypingContentModel> {
    return this.typingContentService.getTypingContentById(Number(id))
  }
}
