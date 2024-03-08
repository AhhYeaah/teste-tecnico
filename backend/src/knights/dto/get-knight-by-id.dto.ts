import Validator from 'src/pipes/Validation/Validator';
import { KnightDto } from './types/knight.dto';

export type GetKnightByIdOutput = Promise<KnightDto>;

export const GetKnightByIdSchema = Validator.object({
  id: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
