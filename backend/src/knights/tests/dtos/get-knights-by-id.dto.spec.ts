import { GetKnightByIdSchema } from 'src/knights/dto/get-knight-by-id.dto';
import { JoiValidationPipe, ValidationPlace } from 'src/pipes/Validation/validation.pipe';

const validator = new JoiValidationPipe(GetKnightByIdSchema, ValidationPlace.PARAMS);

describe('GetKnightByIdDto', () => {
  it('should pass with correct params', () => {
    const result = validator.transform({ id: 'test' }, { type: ValidationPlace.PARAMS });
    expect(result).toEqual({ id: 'test' });
  });

  it('should fail without id', () => {
    expect(() => validator.transform({}, { type: ValidationPlace.PARAMS })).toThrow();
  });

  it('should fail with invalid id', () => {
    expect(() => validator.transform({ id: 1 }, { type: ValidationPlace.PARAMS })).toThrow();
  });
});
