import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { WrapResponseInterceptorInterceptor } from './common/interceptors/wrap-response.interceptor.interceptor'
import { ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: process.env.FRONT_BASE_URL,
    credentials: true,
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new WrapResponseInterceptorInterceptor())

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
