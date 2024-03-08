import { DocOptions } from 'src/decorators/docs.decorator';
import { KnightDto } from '../dto/types/knight.dto';

export const CREATE_KNIGHTS_DOC: DocOptions = {
  operation: {
    description: 'Cria um knight, suas armas e define seus atributos.',
  },
  responses: [
    {
      status: 201,
      description: 'Knight criado com sucesso.',
      type: KnightDto,
    },
  ],
};
