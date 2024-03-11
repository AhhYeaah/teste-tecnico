import { GetKnightByIdSchema } from 'src/knights/dto/get-knight-by-id.dto';
import { JoiValidationPipe, ValidationPlace } from 'src/pipes/Validation/validation.pipe';

const validator = new JoiValidationPipe(GetKnightByIdSchema, ValidationPlace.PARAMS);

describe('GetKnightByIdDto', () => {
  it('should pass with correct params', () => {
    const result = validator.transform(
      { id: '65ee50b2f4f8473edb6d7bdb' },
      { type: ValidationPlace.PARAMS },
    );
    expect(result).toEqual({ id: '65ee50b2f4f8473edb6d7bdb' });
  });

  it('should pass with no params', () => {
    expect(validator.transform({}, { type: ValidationPlace.PARAMS })).toEqual({});
  });

  it('should fail with invalid id', () => {
    expect(() =>
      validator.transform({ id: 'INVALID' }, { type: ValidationPlace.PARAMS }),
    ).toThrow();

    expect(() => {
      validator.transform({ id: '222222' }, { type: ValidationPlace.PARAMS });
    }).toThrow();

    expect(() => {
      validator.transform({ id: 1 }, { type: ValidationPlace.PARAMS });
    }).toThrow();

    expect(() => {
      validator.transform({ id: null }, { type: ValidationPlace.PARAMS });
    }).toThrow();
  });
});
