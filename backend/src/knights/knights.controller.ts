import { KnightsService } from './knights.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Docs } from 'src/decorators/docs.decorator';
import { Validate, ValidationPlace } from 'src/pipes/Validation/validation.pipe';
import { FilterTypes } from './filter/FilterTypes/filter';
import { GetKnightSchema } from './dto/get-knight.dto';
import { GetKnightByIdSchema } from './dto/get-knight-by-id.dto';
import { KnightDto } from './dto/knight.dto';
import { KnightNotFoundException } from './errors';
import { DeleteKnightSchema } from './dto/delete-knight.dto';
import {
  UpdateKnightParamsSchema,
  UpdateKnightBodySchema,
  UpdateKnightInput,
} from './dto/update-knight.dto';

@ApiTags('knights')
@Controller('knights')
export class KnightsController {
  constructor(private knightsService: KnightsService) {}

  @Get()
  @Docs({
    operation: {
      description: 'Exibe uma lista de knights.',
      parameters: [
        {
          name: 'filter',
          in: 'query',
          description:
            'Filtro para a pesquisa, caso o valor enviado seja heroes, exibirá todos os herois deletados.',
        },
      ],
    },
    responses: [
      {
        status: 200,
        description: 'Pesquisa realizada com sucesso.',
        type: KnightDto,
        isArray: true,
      },
    ],
  })
  // Eu não vou implementar uma paginação porque não sei se os endpoints precisam estar
  // Do mesmo jeito do documento, mas eu pensei nisso ;)
  @Validate(GetKnightSchema, ValidationPlace.QUERY)
  async getKnights(@Query('filter') filter?: FilterTypes) {
    const results = await this.knightsService.getKnights(filter);

    const resultsMappedToDto = results.map((result) => {
      return new KnightDto(result);
    });

    return resultsMappedToDto;
  }

  @Get(':id')
  @Docs({
    operation: {
      description: 'Exibe o knight cujo id foi passado.',
      parameters: [{ name: 'id', in: 'path' }],
    },
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
  })
  @Validate(GetKnightByIdSchema, ValidationPlace.PARAMS)
  async getKnightById(@Param('id') id: string): Promise<KnightDto> {
    const knight = await this.assertKnightExistance(id);

    return new KnightDto(knight);
  }

  @Put(':id')
  @Docs({
    operation: {
      description: 'Cria um knight.',
    },
    responses: [
      {
        status: 204,
        description: 'Nickname atualizado com sucesso.',
        type: KnightDto,
      },
      {
        status: 404,
        description: 'Knight não encontrado.',
      },
    ],
  })
  @Validate(UpdateKnightBodySchema, ValidationPlace.BODY)
  @Validate(UpdateKnightParamsSchema, ValidationPlace.PARAMS)
  @HttpCode(204)
  async updateKnightNickname(@Param('id') id?: string, @Body() body?: UpdateKnightInput) {
    await this.assertKnightExistance(id);
    await this.knightsService.updateKnightNickname(id, body.nickname);
  }

  @Put(':id')
  @Docs({
    operation: {
      description: 'Cria um knight.',
    },
    responses: [
      {
        status: 204,
        description: 'Nickname atualizado com sucesso.',
        type: KnightDto,
      },
      {
        status: 404,
        description: 'Knight não encontrado.',
      },
    ],
  })
  @Validate(UpdateKnightBodySchema, ValidationPlace.BODY)
  @Validate(UpdateKnightParamsSchema, ValidationPlace.PARAMS)
  @HttpCode(204)
  async createKnight(@Param('id') id?: string, @Body() body?: UpdateKnightInput) {
    await this.assertKnightExistance(id);
    await this.knightsService.updateKnightNickname(id, body.nickname);
  }

  @Delete(':id')
  @Docs({
    operation: {
      description: 'Deleta um Knight e o envia para o Hall of Heroes.',
      parameters: [{ name: 'id', in: 'path' }],
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
  })
  @HttpCode(204)
  @Validate(DeleteKnightSchema, ValidationPlace.PARAMS)
  async deleteKnight(@Param('id') id: string): Promise<void> {
    await this.assertKnightExistance(id);
    await this.knightsService.deleteKnight(id);
  }

  private async assertKnightExistance(id: string) {
    const doesKnightExist = await this.knightsService.getKnightById(id);
    if (!doesKnightExist) {
      throw new KnightNotFoundException();
    }

    return doesKnightExist;
  }
}
