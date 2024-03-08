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
  @Prop({default: 0})
  strength: number;

  @Prop({default: 0})
  dexterity: number;

  @Prop({default: 0})
  constitution: number;

  @Prop({default: 0})
  intelligence: number;

  @Prop({default: 0})
  wisdom: number;

  @Prop({default: 0})
  charisma: number;
}

export const AttributesSchema = SchemaFactory.createForClass(Attributes);
