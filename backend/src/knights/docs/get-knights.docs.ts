import { DocOptions } from 'src/decorators/docs.decorator';
import { KnightDto } from '../dto/types/knight.dto';

export const GET_KNIGHTS_DOC: DocOptions = {
  operation: {
    description: 'Exibe uma lista de knights.',
  },
  parameters: [
    {
      name: 'filter',
      description:
        'Filtro para a pesquisa, caso o valor enviado seja heroes, exibirá todos os herois deletados.',
    },
  ],
  responses: [
    {
      status: 200,
      description: 'Pesquisa realizada com sucesso.',
      type: [KnightDto],
      isArray: true,
    },
  ],
};
