import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './middlewares/app-logger.middleware';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [KnightsModule, MongooseModule.forRoot(process.env.DATABASE_URL)],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
