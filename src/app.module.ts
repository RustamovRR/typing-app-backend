import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { TypingContentCategoryModule } from './typing-content-category/typing-content-category.module'
import { TypingContentModule } from './typing-content/typing-content.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    TypingContentModule,
    TypingContentCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
