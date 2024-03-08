import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Doc an endpoint on swagger.
 */
export class DocOptions {
  operation: Partial<OperationObject>;
  parameters?: ApiParamOptions[];
  responses: ApiResponseOptions[];
}

export function Docs({ operation, parameters = [], responses }: DocOptions) {
  return applyDecorators(
    ApiOperation(operation),
    ...parameters?.map((parameters) => ApiParam(parameters)),
    ...responses.map((option) => ApiResponse(option)),
  );
}
