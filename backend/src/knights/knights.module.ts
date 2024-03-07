import { KnightSchema } from 'src/database/Knight';
import { Module } from '@nestjs/common';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [KnightsController],
  imports: [MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }])],
  providers: [KnightsService],
})
export class KnightsModule {}
