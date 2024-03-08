import { Injectable } from '@nestjs/common';
import { FilterTypes } from './filter/FilterTypes/filter';
import { FilterFactory } from './filter/FilterFactory';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from 'src/database/Knight';
import { CreateKnightInput } from './dto/create-knight.dto';
import { WeaponEntity } from './entities/Weapon.entity';
import { AttributesEntity } from './entities/Attributes.entity';

@Injectable()
export class KnightsService {
  constructor(@InjectModel(Knight.name) private knightModel: Model<KnightDocument>) {}

  // Nem tudo que esta sendo feito aqui é realmente necessário.
  // Acredito que esta seria minha oportunidade de mostrar o que eu sei.
  // Então, aqui esta um Factory.
  getKnights(filter = FilterTypes.ALL, filterArgs?: unknown): Promise<KnightDocument[]> {
    const filterInstance = FilterFactory.getFilter(filter);
    return filterInstance.find(this.knightModel, filterArgs);
  }

  getKnightById(id: string): Promise<KnightDocument | undefined> {
    return this.knightModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  createKnight(
    knightDto: Omit<CreateKnightInput, keyof { weapons; attributes }>,
    weaponsDto: WeaponEntity[],
    attributes: AttributesEntity,
  ): Promise<KnightDocument> {
    return this.knightModel.create({
      ...knightDto,
      birthday: new Date(knightDto.birthday),
      weapons: weaponsDto,
      attributes,
    });
  }

  async deleteKnight(id: string): Promise<void> {
    await this.knightModel.updateOne({ _id: id }, { deletedAt: new Date() });
  }

  async updateKnightNickname(id: string, nickname: string): Promise<void> {
    await this.knightModel.updateOne({ _id: id }, { nickname });
  }
}
