import { Module } from '@nestjs/common'
import { TypingContentService } from './typing-content.service'
import { TypingContentController } from './typing-content.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [TypingContentController],
  providers: [TypingContentService],
  imports: [PrismaModule],
})
export class TypingContentModule {}
