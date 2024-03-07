import Validator from 'src/pipes/Validation/Validator';

export const GetKnightByIdSchema = Validator.object({
  id: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
