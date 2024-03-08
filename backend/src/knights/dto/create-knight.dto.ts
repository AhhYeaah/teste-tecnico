import { KnightDto } from './types/knight.dto';
import { AttributeType } from 'src/database/Attributes';
import Validator from 'src/pipes/Validation/Validator';
import { KnightEntity } from '../entities/Knight.entity';

export type CreateKnightInput = KnightEntity;
export type CreateKnightOutput = Promise<KnightDto>;

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
