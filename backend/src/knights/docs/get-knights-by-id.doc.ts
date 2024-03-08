import { DocOptions } from 'src/decorators/docs.decorator';
import { KnightEntity } from '../entities/Knight.entity';

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
      type: KnightEntity,
      isArray: false,
    },
    {
      status: 404,
      description: 'Knight não encontrado.',
    },
  ],
};
