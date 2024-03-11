import Validator from 'src/pipes/Validation/Validator';

export type DeleteKnightInput = {
  id: string;
};
export type DeleteKnightOutput = Promise<void>;

export const DeleteKnightSchema = Validator.object({
  id: Validator.string().hex().length(24),
})
  .options({ presence: 'required' })
  .required();
