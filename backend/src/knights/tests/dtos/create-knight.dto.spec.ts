import { CreateKnightSchema } from 'src/knights/dto/create-knight.dto';
import { JoiValidationPipe, ValidationPlace } from 'src/pipes/Validation/validation.pipe';

const validator = new JoiValidationPipe(CreateKnightSchema, ValidationPlace.BODY);

describe('CreateKnightDto', () => {
  it('should pass with correct params', () => {
    const result = validator.transform({ name: 'Sir Lancelot' }, { type: ValidationPlace.BODY });
    expect(result).toEqual({ name: 'Sir Lancelot' });
  });

  it('should fail', () => {
    expect(() => validator.transform({}, { type: ValidationPlace.BODY })).toThrow();
  });
});
