import Validator from 'src/pipes/Validation/Validator';
import { KnightEntity } from '../entities/Knight.entity';

export type GetKnightByIdInput = {
  id: string;
};
export type GetKnightByIdOutput = Promise<KnightEntity>;

export const GetKnightByIdSchema = Validator.object({
  id: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
