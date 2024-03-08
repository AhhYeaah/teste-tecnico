import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AttributeType } from './Attributes';

export type WeaponDocument = HydratedDocument<Weapon>;

@Schema()
export class Weapon {
  @Prop()
  name: string;

  @Prop()
  mod: number;

  @Prop({ enum: AttributeType })
  attr: AttributeType;

  @Prop()
  equipped: true;
}

const WeaponSchema = SchemaFactory.createForClass(Weapon);

export { WeaponSchema };
