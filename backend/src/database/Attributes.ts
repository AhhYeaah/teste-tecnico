import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttributesDocument = HydratedDocument<Attributes>;

export enum AttributeType {
  STRENGTH = 'strength',
  DEXTERITY = 'dexterity',
  CONSTITUTION = 'constitution',
  INTELLIGENCE = 'intelligence',
  WISDOM = 'wisdom',
  CHARISMA = 'charisma',
}

@Schema({
  _id: false,
})
export class Attributes {
  @Prop({ default: 8 })
  strength: number;

  @Prop({ default: 8 })
  dexterity: number;

  @Prop({ default: 8 })
  constitution: number;

  @Prop({ default: 8 })
  intelligence: number;

  @Prop({ default: 8 })
  wisdom: number;

  @Prop({ default: 8 })
  charisma: number;
}

export const AttributesSchema = SchemaFactory.createForClass(Attributes);
