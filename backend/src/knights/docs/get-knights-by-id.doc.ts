import { DocOptions } from 'src/decorators/docs.decorator';
import { KnightDto } from '../dto/types/knight.dto';

export const GET_KNIGHTS_BY_ID_DOC: DocOptions = {
  operation: {
    description: 'Exibe o knight cujo id foi passado.',
  },
  parameters: [
    {
      name: 'id',
      schema: { type: 'string' },
      required: true,
      description: 'Id do knight a ser pesquisado.',
    },
  ],
  responses: [
    {
      status: 200,
      description: 'Pesquisa realizada com sucesso.',
      type: KnightDto,
      isArray: false,
    },
    {
      status: 404,
      description: 'Knight não encontrado.',
    },
  ],
};
