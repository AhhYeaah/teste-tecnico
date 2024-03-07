import { GetKnightSchema } from 'src/knights/dto/get-knight.dto';
import { FilterTypes } from 'src/knights/filter/FilterTypes/filter';
import { JoiValidationPipe, ValidationPlace } from 'src/pipes/Validation/validation.pipe';

const validator = new JoiValidationPipe(GetKnightSchema, ValidationPlace.QUERY);

describe('GetKnightDto', () => {
  it('should pass with correct params', () => {
    const result = validator.transform(
      { filter: FilterTypes.HEROES },
      { type: ValidationPlace.QUERY },
    );
    expect(result).toEqual({ filter: FilterTypes.HEROES });
  });

  it('should pass with no params at all', () => {
    expect(validator.transform({}, { type: ValidationPlace.QUERY })).toEqual({});
  });

  it('should fail with invalid filter', () => {
    expect(() =>
      validator.transform({ filter: 'INVALID' }, { type: ValidationPlace.QUERY }),
    ).toThrow();
  });
});
