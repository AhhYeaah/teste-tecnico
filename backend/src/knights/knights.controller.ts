import { KnightsService } from './knights.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Docs } from 'src/decorators/docs.decorator';
import { Validate, ValidationPlace } from 'src/pipes/Validation/validation.pipe';
import { GetKnightInput, GetKnightOutput, GetKnightSchema } from './dto/get-knight.dto';
import {
  GetKnightByIdInput,
  GetKnightByIdOutput,
  GetKnightByIdSchema,
} from './dto/get-knight-by-id.dto';
import { KnightDto } from './dto/types/knight.dto';
import { KnightNotFoundException } from './errors';
import { DeleteKnightOutput, DeleteKnightSchema } from './dto/delete-knight.dto';
import {
  UpdateKnightParamsSchema,
  UpdateKnightBodySchema,
  UpdateKnightInput,
  UpdateKnightOutput,
} from './dto/update-knight.dto';
import { GET_KNIGHTS_DOC } from './docs/get-knights.docs';
import { GET_KNIGHTS_BY_ID_DOC } from './docs/get-knights-by-id.doc';
import { UPDATE_KNIGHTS_NICKNAME_DOC } from './docs/update-knights.doc';
import { DELETE_KNIGHTS_DOC } from './docs/delete-knights.doc';
import { CreateKnightInput, CreateKnightOutput, CreateKnightSchema } from './dto/create-knight.dto';
import { CREATE_KNIGHTS_DOC } from './docs/create-knight.doc';
import { KnightEntity } from './entities/Knight.entity';

@ApiTags('knights')
@Controller('knights')
export class KnightsController {
  constructor(private knightsService: KnightsService) {}

  @Get()
  @Docs(GET_KNIGHTS_DOC)
  // Eu não vou implementar uma paginação porque não sei se os endpoints precisam estar
  // Do mesmo jeito do documento, mas eu pensei nisso ;)
  @Validate(GetKnightSchema, ValidationPlace.QUERY)
  async getKnights(@Query() { filter }: GetKnightInput): GetKnightOutput {
    const results = await this.knightsService.getKnights(filter);
    const resultsMappedToDto = results.map((result) => {
      return new KnightDto(result);
    });

    return resultsMappedToDto;
  }

  @Get(':id')
  @Docs(GET_KNIGHTS_BY_ID_DOC)
  @Validate(GetKnightByIdSchema, ValidationPlace.PARAMS)
  async getKnightById(@Param() { id }: GetKnightByIdInput): GetKnightByIdOutput {
    await this.assertKnightExistance(id);
    const knight = await this.knightsService.getKnightById(id);

    return new KnightEntity(knight);
  }

  @Put(':id')
  @Docs(UPDATE_KNIGHTS_NICKNAME_DOC)
  @Validate(UpdateKnightBodySchema, ValidationPlace.BODY)
  @Validate(UpdateKnightParamsSchema, ValidationPlace.PARAMS)
  @HttpCode(204)
  async updateKnightNickname(
    @Param() { id }: { id: string },
    @Body() body?: UpdateKnightInput,
  ): UpdateKnightOutput {
    await this.assertKnightExistance(id);
    await this.knightsService.updateKnightNickname(id, body.nickname);
  }

  @Delete(':id')
  @Docs(DELETE_KNIGHTS_DOC)
  @HttpCode(204)
  @Validate(DeleteKnightSchema, ValidationPlace.PARAMS)
  async deleteKnight(@Param() { id }: { id: string }): DeleteKnightOutput {
    await this.assertKnightExistance(id);
    await this.knightsService.deleteKnight(id);
  }

  @Post()
  @Docs(CREATE_KNIGHTS_DOC)
  @Validate(CreateKnightSchema, ValidationPlace.BODY)
  async createKnight(
    @Body() { attributes, weapons, ...knight }: CreateKnightInput,
  ): CreateKnightOutput {
    const createdKnight = await this.knightsService.createKnight(knight, weapons, attributes);
    console.log(createdKnight);
    return new KnightDto(createdKnight);
  }

  private async assertKnightExistance(id: string) {
    const doesKnightExist = await this.knightsService.getKnightById(id);
    if (!doesKnightExist) {
      throw new KnightNotFoundException();
    }

    return doesKnightExist;
  }
}
