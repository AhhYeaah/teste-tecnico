import { ApiProperty } from '@nestjs/swagger';
import Validator from 'src/pipes/Validation/Validator';

export class UpdateKnightInput {
  @ApiProperty({
    type: String,
    description: 'The new nickname of the knight',
    example: 'Sir Natsu Dragneel',
  })
  nickname: string;
}
export type UpdateKnightOutput = Promise<void>;

export const UpdateKnightBodySchema = Validator.object({
  nickname: Validator.string(),
})
  .options({ presence: 'required' })
  .required();

export const UpdateKnightParamsSchema = Validator.object({
  id: Validator.string().hex().length(24),
})
  .options({ presence: 'required' })
  .required();
