import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AttributeType, Attributes } from './Attributes';
import { differenceInYears } from 'date-fns';

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
