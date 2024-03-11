import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from 'src/database/Attributes';
import { WeaponEntity } from '../../weapons/entities/Weapon.entity';
import { AttributesEntity } from '../../attributes/entities/Attributes.entity';
import { KnightDocument } from 'src/database/Knight';

export class KnightEntity {
  @ApiProperty({
    type: String,
    description: 'The name of the knight',
    example: 'Sir Lancelot',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The nickname of the knight',
    example: 'Lance',
  })
  nickname: string;

  @ApiProperty({
    type: String,
    description: 'A ISODate string representing the birthday of the knight',
    example: '1996-12-17T03:24:00',
  })
  birthday: string;

  @ApiProperty({
    type: [WeaponEntity],
    description: 'The weapons the knight has, at least one weapon is required',
    minItems: 1,
  })
  weapons: WeaponEntity[];

  @ApiProperty({
    type: AttributesEntity,
    description: 'The attributes of the knight, unset attributes will be set to 8 by default',
  })
  attributes: AttributesEntity;

  @ApiProperty({
    type: String,
    description: 'The main attribute of the knight',
    example: AttributeType.STRENGTH,
    enum: AttributeType,
  })
  keyAttribute: AttributeType;

  constructor(knight: KnightDocument) {
    this.name = knight.name;
    this.nickname = knight.nickname;
    this.birthday = knight.birthday.toISOString();
    this.weapons = knight.weapons;
    this.attributes = knight.attributes;
    this.keyAttribute = knight.keyAttribute;
  }
}
