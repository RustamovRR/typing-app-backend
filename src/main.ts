import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true })

  app.use(cookieParser())
  app.enableCors({
    origin: process.env.FRONT_BASE_URL,
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }))

  const config = new DocumentBuilder()
    .setTitle('Typing app')
    .setDescription('The typing-app API description')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT)
}
bootstrap()
