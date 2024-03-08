import { ApiProperty } from '@nestjs/swagger';

import { AttributeType } from 'src/database/Attributes';
import Validator from 'src/pipes/Validation/Validator';
import { WeaponDto } from './types/weapon.dto';
import { AttributesDto } from './types/attributes.dto';

export class CreateKnightInput {
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
    type: [WeaponDto],
    description: 'The weapons the knight has, at least one weapon is required',
    minItems: 1,
  })
  weapons: WeaponDto[];

  @ApiProperty({
    type: AttributesDto,
    description: 'The attributes of the knight, unset attributes will be set to 8 by default',
  })
  attributes: AttributesDto;

  @ApiProperty({
    type: String,
    description: 'The main attribute of the knight',
    example: AttributeType.STRENGTH,
    enum: AttributeType,
  })
  keyAttribute: AttributeType;
}

export type CreateKnightOutput = Promise<void>;

export const CreateKnightSchema = Validator.object({
  name: Validator.string(),
  nickname: Validator.string(),
  birthday: Validator.string().isoDate(),

  weapons: Validator.array()
    .items(
      Validator.object({
        name: Validator.string(),
        mod: Validator.number(),
        attr: Validator.string().valid(...Object.values(AttributeType)),
        equipped: Validator.boolean(),
      }),
    )
    .min(1),

  attributes: Validator.object({
    strength: Validator.number().min(8).max(20).optional(),
    dexterity: Validator.number().min(8).max(20).optional(),
    constitution: Validator.number().min(8).max(20).optional(),
    intelligence: Validator.number().min(8).max(20).optional(),
    wisdom: Validator.number().min(8).max(20).optional(),
    charisma: Validator.number().min(8).max(20).optional(),
  }),

  keyAttribute: Validator.string().valid(...Object.values(AttributeType)),
})
  .options({ presence: 'required' })
  .required();
