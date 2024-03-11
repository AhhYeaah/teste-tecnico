import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Knight } from 'src/database/Knight';
import { KnightEntity } from 'src/knights/entities/Knight.entity';
import { FilterTypes } from 'src/knights/filter/FilterTypes/filter';
import { KnightsService } from 'src/knights/knights.service';
import { GET_KNIGHT_BY_ID_RESULT, GET_KNIGHT_RESULT } from 'src/knights/tests/fixtures';
import { WeaponEntity } from 'src/weapons/entities/Weapon.entity';

describe('KnightsService', () => {
  let knightService: KnightsService;
  let model: Model<Knight>;

  const mockKnightService = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        {
          provide: getModelToken(Knight.name),
          useValue: mockKnightService,
        },
      ],
    }).compile();

    knightService = module.get<KnightsService>(KnightsService);
    model = module.get<Model<Knight>>(getModelToken(Knight.name));
  });

  describe('getKnights', () => {
    it('should return an array of knights', async () => {
      const result = GET_KNIGHT_RESULT;
      jest.spyOn(model, 'find').mockResolvedValue(result);

      expect(await knightService.getKnights()).toBe(result);
      expect(model.find).toBeCalledWith({
        deletedAt: null,
      });
    });

    it('should return an array of heroes', async () => {
      const result = GET_KNIGHT_RESULT;
      jest.spyOn(model, 'find').mockResolvedValue(result);

      expect(await knightService.getKnights(FilterTypes.HEROES)).toBe(result);
      expect(model.find).toBeCalledWith({
        deletedAt: {
          $ne: null,
        },
      });
    });
  });

  describe('getKnightById', () => {
    it('should return a knight', async () => {
      const result = GET_KNIGHT_BY_ID_RESULT;
      jest.spyOn(model, 'findOne').mockResolvedValue(result);

      expect(await knightService.getKnightById('1')).toBe(result);
      expect(model.findOne).toBeCalledWith({
        _id: '1',
        deletedAt: null,
      });
    });
  });

  describe('createKnight', () => {
    it('should create a knight', async () => {
      const result = { ...GET_KNIGHT_BY_ID_RESULT };
      const { weapons, attributes, ...knight } = result;
      jest
        .spyOn(model, 'create')
        .mockResolvedValue(new Promise((r) => r({ ...result, _id: '1' } as any)));

      expect(
        await knightService.createKnight(
          { ...knight, birthday: result.birthday.toISOString() } as KnightEntity,
          weapons as WeaponEntity[],
          attributes,
        ),
      ).toStrictEqual({ ...result, _id: '1' });
      expect(model.create).toBeCalledWith(expect.any(Object));
    });
  });

  describe('deleteKnight', () => {
    it('should delete a knight', async () => {
      jest.spyOn(model, 'updateOne').mockResolvedValue({} as any);

      await knightService.deleteKnight('1');
      expect(model.updateOne).toBeCalledWith({ _id: '1' }, { deletedAt: expect.any(Date) });
    });
  });

  describe('updateKnightNickname', () => {
    it('should update a knight', async () => {
      jest.spyOn(model, 'updateOne').mockResolvedValue({} as any);

      await knightService.updateKnightNickname('1', 'nickname');
      expect(model.updateOne).toBeCalledWith({ _id: '1' }, { nickname: 'nickname' });
    });
  });
});
