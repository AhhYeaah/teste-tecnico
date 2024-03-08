import { KnightSchema } from 'src/database/Knight';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaponsService } from './weapons.service';
import { WeaponSchema } from 'src/database/Weapon';

@Module({
  controllers: [],
  imports: [MongooseModule.forFeature([{ name: 'Weapons', schema: WeaponSchema }])],
  providers: [WeaponsService],
})
export class KnightsModule {}
