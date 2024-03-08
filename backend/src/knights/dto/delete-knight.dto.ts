import Validator from 'src/pipes/Validation/Validator';

export type DeleteKnightOutput = Promise<void>;

export const DeleteKnightSchema = Validator.object({
  id: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
