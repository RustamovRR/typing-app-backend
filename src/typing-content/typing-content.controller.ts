import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { getLang } from 'src/common/utils'
import { CreateTypingContentDto } from './dto/create-typing-content.dto'
import { UpdateTypingContentDto } from './dto/update-typing-content.dto'
import { TypingContentEntity } from './entities/typing-content.entity'
import { TypingContentService } from './typing-content.service'

@ApiTags('typing-contents')
@Controller('api/typing-contents')
export class TypingContentController {
  constructor(private readonly typingContentService: TypingContentService) {}

  @Post()
  async createTypingContent(@Body() data: CreateTypingContentDto, @Req() req: Request, @Res() res: Response) {
    const result = JSON.stringify(data).split(' ')
    res.send({ data: result })
    return this.typingContentService.create(data)
  }

  @Get()
  async getTypingContents(@Body() body, @Req() req: Request, @Res() res: Response) {
    res.send(this.typingContentService.findAll())
  }

  @Get(':id')
  async getTypingContentById(@Param('id') id: string): Promise<TypingContentEntity> {
    return this.typingContentService.findOne({ id: +id })
  }

  @Put(':id')
  async updateTypingContent(
    @Param('id') id: string,
    @Body() data: UpdateTypingContentDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<TypingContentEntity> {
    try {
      const lang = getLang(req)
      const updatedTypingContent = await this.typingContentService.update({ where: { id: +id }, data }, lang)
      const typingContentEntity = plainToInstance(TypingContentEntity, updatedTypingContent)
      return typingContentEntity
    } catch (error) {
      console.log('USER PUT ERROR', error)
      res.status(429).send({ status: false, message: error })
    }
  }

  @Delete(':id')
  async deleteTypingContent(@Param('id') id: string): Promise<TypingContentEntity> {
    return this.typingContentService.findOne({ id: +id })
  }
}
