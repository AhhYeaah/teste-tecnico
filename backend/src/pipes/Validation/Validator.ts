import * as OriginalJoi from 'joi';
import { messages } from 'joi-translation-pt-br';

/**
 * Overrides the default Joi configuration to use the Brazilian Portuguese translation
 */
export default OriginalJoi.defaults((schema) => {
  return schema.options({
    messages,
    errors: {
      wrap: {
        label: "'",
      },
    },
  });
});
