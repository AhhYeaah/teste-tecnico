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
  @Prop()
  strength: number;

  @Prop()
  dexterity: number;

  @Prop()
  constitution: number;

  @Prop()
  intelligence: number;

  @Prop()
  wisdom: number;

  @Prop()
  charisma: number;
}

export const AttributesSchema = SchemaFactory.createForClass(Attributes);
