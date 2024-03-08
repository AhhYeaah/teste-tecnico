import { AttributeType } from 'src/database/Attributes';
import { CreateKnightInput, CreateKnightSchema } from 'src/knights/dto/create-knight.dto';
import { JoiValidationPipe, ValidationPlace } from 'src/pipes/Validation/validation.pipe';

const validator = new JoiValidationPipe(CreateKnightSchema, ValidationPlace.BODY);
const VALID_KNIGHT: CreateKnightInput = {
  name: 'Sir Lancelot', // Assuming validation is done here
  nickname: 'The Lionhearted',
  birthday: new Date().toISOString(),
  keyAttribute: AttributeType.STRENGTH,
  weapons: [
    {
      name: 'Sword',
      mod: 5,
      attr: AttributeType.STRENGTH,
      equipped: true,
    },
    {
      name: 'Bow',
      mod: 3,
      attr: AttributeType.DEXTERITY,
      equipped: false,
    },
  ],
  attributes: {
    strength: 10,
    dexterity: 12,
    constitution: 14,
    intelligence: 8,
    wisdom: 16,
    charisma: 9,
  },
};

describe('CreateKnightDto', () => {
  it('should pass with correct params', () => {
    const result = validator.transform(VALID_KNIGHT, { type: ValidationPlace.BODY });
    expect(result).toEqual(VALID_KNIGHT);
  });

  it('should fail with invalid date in birthday', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, birthday: '2011-10-40T14:48:00.000Z' }, // Invalid date
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });

  it('should fail with invalid attribute in weapons', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, weapons: [{ ...VALID_KNIGHT.weapons[0], attr: 'INVALID' }] }, // Invalid attribute
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });

  it('should fail with invalid attribute in keyAttribute', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, keyAttribute: 'INVALID' }, // Invalid attribute
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });

  it('should fail if atribute is out of valid range', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, attributes: { ...VALID_KNIGHT.attributes, strength: 21 } }, // Invalid attribute
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });

  it('should fail if atribute is out of valid range', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, attributes: { ...VALID_KNIGHT.attributes, strength: 7 } }, // Invalid attribute
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });

  it('should fail if weapons is empty', () => {
    expect(() =>
      validator.transform(
        { ...VALID_KNIGHT, weapons: [] }, // Invalid attribute
        { type: ValidationPlace.BODY },
      ),
    ).toThrow();
  });
});
