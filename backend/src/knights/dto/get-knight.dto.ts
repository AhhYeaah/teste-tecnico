import Validator from 'src/pipes/Validation/Validator';
import { FilterTypes } from '../filter/FilterTypes/filter';
import { KnightDto } from './types/knight.dto';

export type GetKnightInput = {
  filter: FilterTypes;
};
export type GetKnightOutput = Promise<KnightDto[]>;

export const GetKnightSchema = Validator.object({
  filter: Validator.string().valid(FilterTypes.HEROES).optional(),
})
  .options({ presence: 'required' })
  .required();
