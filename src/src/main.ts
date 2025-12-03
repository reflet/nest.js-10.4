import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // グローバルにフィルターを適用（全エンドポイントで有効）
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // グローバルにインターセプターを適用（全エンドポイントで有効）
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
