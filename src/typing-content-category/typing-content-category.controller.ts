import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { getLang } from 'src/common/utils'
import { CreateTypingContentCategoryDto } from './dto/create-typing-content-category.dto'
import { UpdateTypingContentCategoryDto } from './dto/update-typing-content-category.dto'
import { TypingContentCategoryEntity } from './entities/typing-content-category.entity'
import { TypingContentCategoryService } from './typing-content-category.service'

@ApiTags('typing-content-categories')
@Controller('api/typing-content-categories')
export class TypingContentCategoryController {
  constructor(private readonly typingContentCategoryService: TypingContentCategoryService) {}

  @Post()
  async create(@Body() data: CreateTypingContentCategoryDto, @Req() req: Request, @Res() res: Response) {
    const result = JSON.stringify(data).split(' ')
    res.send({ data: result })
    return this.typingContentCategoryService.create(data)
  }

  @Get()
  async getTypingContentCategories(@Body() body, @Req() req: Request, @Res() res: Response) {
    res.send(this.typingContentCategoryService.findAll())
  }

  @Get(':id')
  async getTypingContentCategoryById(@Param('id') id: string): Promise<TypingContentCategoryEntity> {
    return this.typingContentCategoryService.findOne({ id: +id })
  }

  @Put(':id')
  async updateTypingContentCategory(
    @Param('id') id: string,
    @Body() data: UpdateTypingContentCategoryDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<TypingContentCategoryEntity> {
    try {
      const lang = getLang(req)
      const updatedTypingContent = await this.typingContentCategoryService.update({ where: { id: +id }, data }, lang)
      const typingContentEntity = plainToInstance(TypingContentCategoryEntity, updatedTypingContent)
      return typingContentEntity
    } catch (error) {
      console.log('USER PUT ERROR', error)
      res.status(429).send({ status: false, message: error })
    }
  }

  @Delete(':id')
  async deleteTypingContentCategory(@Param('id') id: string): Promise<TypingContentCategoryEntity> {
    return this.typingContentCategoryService.findOne({ id: +id })
  }
}
