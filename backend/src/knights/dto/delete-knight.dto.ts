import Validator from 'src/pipes/Validation/Validator';

export const DeleteKnightSchema = Validator.object({
  id: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
