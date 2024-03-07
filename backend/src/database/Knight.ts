import { Experience } from './../utils/Experience';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Attributes } from './Attributes';
import { differenceInYears } from 'date-fns';
import { Weapon } from './Weapon';
import { Mod } from 'src/utils/Mod';

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class Knight {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  birthday: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attributes' })
  attributes: Attributes;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' })
  weapons: Weapon[];

  @Prop()
  deletedAt: Date;

  age: number;
  equippedWeapon: Weapon;
  attack: number;
  weaponNumber: number;
  exp: number;
}

const KnightSchema = SchemaFactory.createForClass(Knight);

KnightSchema.virtual('age').get(function (this: KnightDocument) {
  return differenceInYears(new Date(), this.birthday);
});

KnightSchema.virtual('equippedWeapon').get(function (this: KnightDocument) {
  return this.weapons.find((weapon) => weapon.equipped);
});

KnightSchema.virtual('attack').get(function (this: KnightDocument) {
  return Mod.getModByAttrValue(this.attributes[this.equippedWeapon.attr]) + this.equippedWeapon.mod;
});

KnightSchema.virtual('weaponNumber').get(function (this: KnightDocument) {
  return this.weapons.length;
});

KnightSchema.virtual('exp').get(function (this: KnightDocument) {
  return Experience.calculateExperience(this.age);
});

export { KnightSchema };
