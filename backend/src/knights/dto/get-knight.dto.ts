import Validator from 'src/pipes/Validation/Validator';
import { FilterTypes } from '../filter/FilterTypes/filter';

export const GetKnightSchema = Validator.object({
  filter: Validator.string().valid(FilterTypes.HEROES).optional(),
})
  .options({ presence: 'required' })
  .required();
