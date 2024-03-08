import { AttributeType } from 'src/database/Attributes';
import Validator from 'src/pipes/Validation/Validator';


interface Weapon {
  name: string;
  mod: number;
  attr: AttributeType;
  equipped: boolean;
}

export class Knight {
  name: string;
  nickname: string;
  birthday: Date;
  weapons: Weapon[];
  attributes: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  keyAttribute: AttributeType;

}

export const CreateKnightSchema = Validator.object({
  name: Validator.string(),
  nickname: Validator.string(),
  birthday: Validator.string().isoDate(),

  weapons: Validator.array().items(Validator.object({
    name: Validator.string(),
    mod: Validator.number(),
    attr: Validator.string().valid(Object.values(AttributeType)),
    equipped: Validator.boolean(),
  })),

  attributes: Validator.object({
    strength: Validator.number().optional(),
    dexterity: Validator.number().optional(),
    constitution: Validator.number().optional(),
    intelligence: Validator.number().optional(),
    wisdom: Validator.number().optional(),
    charisma: Validator.number().optional(), 
  }),

  keyAttribute: Validator.string().valid(Object.values(AttributeType))
})
  .options({ presence: 'required' })
  .required();
