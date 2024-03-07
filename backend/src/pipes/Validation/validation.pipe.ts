import {
  PipeTransform,
  BadRequestException,
  applyDecorators,
  UsePipes,
  ArgumentMetadata,
} from '@nestjs/common';
import { Schema, ValidationError } from 'joi';
import Validator from 'src/pipes/Validation/Validator';

export enum ValidationPlace {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'param',
}

export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: Schema,
    private where: ValidationPlace,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const isValidatingTheRightPlace = metadata.type === this.where;
    if (isValidatingTheRightPlace) {
      try {
        Validator.assert(value, this.schema);
      } catch (error) {
        const validationError = (error as ValidationError).details[0];
        throw new BadRequestException(validationError.message);
      }
    }

    return value;
  }
}

/**
 * Validates the body of response against the provided schema
 * @param schema A joi schema
 */
export function Validate(schema: Schema, where: ValidationPlace = ValidationPlace.BODY) {
  return applyDecorators(UsePipes(new JoiValidationPipe(schema, where)));
}
