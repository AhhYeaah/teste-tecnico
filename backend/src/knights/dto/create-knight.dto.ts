import Validator from 'src/pipes/Validation/Validator';

export const CreateKnightSchema = Validator.object({
  name: Validator.string(),
})
  .options({ presence: 'required' })
  .required();
