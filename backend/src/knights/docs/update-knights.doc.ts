import { DocOptions } from 'src/decorators/docs.decorator';

export const UPDATE_KNIGHTS_NICKNAME_DOC: DocOptions = {
  operation: {
    description: 'Cria um knight.',
  },
  responses: [
    {
      status: 204,
      description: 'Nickname atualizado com sucesso.',
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
      description: 'Id do knight a ser atualizado.',
    },
  ],
};
