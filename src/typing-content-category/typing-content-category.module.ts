import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TypingContentCategoryController } from './typing-content-category.controller'
import { TypingContentCategoryService } from './typing-content-category.service'

@Module({
  controllers: [TypingContentCategoryController],
  providers: [TypingContentCategoryService],
  imports: [PrismaModule],
})
export class TypingContentCategoryModule {}
