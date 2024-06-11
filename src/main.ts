import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { WrapResponseInterceptorInterceptor } from './common/interceptors/wrap-response.interceptor.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors({
    origin: process.env.FRONT_BASE_URL,
    credentials: true,
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new WrapResponseInterceptorInterceptor())
  await app.listen(process.env.PORT)
}
bootstrap()
