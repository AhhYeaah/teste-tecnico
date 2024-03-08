import { DocOptions } from 'src/decorators/docs.decorator';

export const DELETE_KNIGHTS_DOC: DocOptions = {
  operation: {
    description: 'Deleta um Knight e o envia para o Hall of Heroes.',
  },
  responses: [
    {
      status: 204,
      description: 'Knight deletado com sucesso.',
    },
    {
      status: 404,
      description: 'Knight não encontrado.',
    },
  ],
  parameters: [
    {
      name: 'id',
      schema: { type: 'string' },
      required: true,
      description: 'Id do knight a ser deletado.',
    },
  ],
};
