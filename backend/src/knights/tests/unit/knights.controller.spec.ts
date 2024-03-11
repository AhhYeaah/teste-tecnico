import { Test, TestingModule } from '@nestjs/testing';
import { KnightsController } from 'src/knights/knights.controller';
import { KnightsService } from 'src/knights/knights.service';
import { GET_KNIGHT_BY_ID_RESULT } from '../fixtures';
import { FilterTypes } from 'src/knights/filter/FilterTypes/filter';
import { KnightDto } from 'src/knights/dto/types/knight.dto';

describe('KnightsController', () => {
  let knightController: KnightsController;

  const mockKnightsService = {
    getKnights: jest.fn(),
    getKnightById: jest.fn(),
    updateKnightNickname: jest.fn(),
    deleteKnight: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightsController],
      providers: [
        {
          provide: KnightsService,
          useValue: mockKnightsService,
        },
      ],
    }).compile();

    knightController = module.get<KnightsController>(KnightsController);
  });

  describe('getKnights', () => {
    it('should return an array of knights', async () => {
      const knight = {
        ...GET_KNIGHT_BY_ID_RESULT,
        _id: 1,
        equippedWeapon: {
          name: 'Sword',
          mod: 5,
          attr: 'strength',
          equipped: true,
        },
        exp: 0,
        weaponNumber: 2,
        attack: 5 - 1,
      };

      const result = new KnightDto(knight as any);
      mockKnightsService.getKnights.mockResolvedValue([knight]);

      expect(await knightController.getKnights({ filter: undefined })).toStrictEqual([result]);
      expect(mockKnightsService.getKnights).toBeCalledWith(undefined);
    });

    it('should return an array of heroes', async () => {
      const knight = {
        ...GET_KNIGHT_BY_ID_RESULT,
        _id: 1,
        equippedWeapon: {
          name: 'Sword',
          mod: 5,
          attr: 'strength',
          equipped: true,
        },
        exp: 0,
        weaponNumber: 2,
        attack: 5 - 1,
      };

      const result = new KnightDto(knight as any);
      mockKnightsService.getKnights.mockResolvedValue([knight]);

      expect(
        await knightController.getKnights({
          filter: FilterTypes.HEROES,
        }),
      ).toStrictEqual([result]);
      expect(mockKnightsService.getKnights).toBeCalledWith(FilterTypes.HEROES);
    });

    it('should return an empty array if no knights are found', async () => {
      mockKnightsService.getKnights.mockResolvedValue([]);

      expect(
        await knightController.getKnights({
          filter: undefined,
        }),
      ).toStrictEqual([]);
      expect(mockKnightsService.getKnights).toBeCalledWith(undefined);
    });
  });

  describe('getKnightById', () => {
    it('should return a knight', async () => {
      const knight = GET_KNIGHT_BY_ID_RESULT;

      mockKnightsService.getKnightById.mockResolvedValue(knight);

      expect(await knightController.getKnightById({ id: '1' })).toEqual({
        ...knight,
        birthday: knight.birthday.toISOString(),
      });
      expect(mockKnightsService.getKnightById).toBeCalledWith('1');
    });

    it('should throw an error if the knight is not found', async () => {
      mockKnightsService.getKnightById.mockResolvedValue(null);

      await expect(knightController.getKnightById({ id: '1' })).rejects.toThrow();
      expect(mockKnightsService.getKnightById).toBeCalledWith('1');
    });
  });

  describe('updateKnightNickname', () => {
    it('should update the knight nickname', async () => {
      mockKnightsService.getKnightById.mockResolvedValue(GET_KNIGHT_BY_ID_RESULT);
      mockKnightsService.updateKnightNickname.mockResolvedValue(null);

      await knightController.updateKnightNickname({ id: '1' }, { nickname: 'Sir Lancelot' });
      expect(mockKnightsService.updateKnightNickname).toBeCalledWith('1', 'Sir Lancelot');
    });

    it('should throw an error if the knight is not found', async () => {
      mockKnightsService.getKnightById.mockResolvedValue(null);

      await expect(
        knightController.updateKnightNickname({ id: '1' }, { nickname: 'Sir Lancelot' }),
      ).rejects.toThrow();
      expect(mockKnightsService.getKnightById).toBeCalledWith('1');
    });
  });

  describe('deleteKnight', () => {
    it('should delete the knight', async () => {
      mockKnightsService.getKnightById.mockResolvedValue(GET_KNIGHT_BY_ID_RESULT);
      mockKnightsService.deleteKnight.mockResolvedValue(null);

      await knightController.deleteKnight({ id: '1' });
      expect(mockKnightsService.deleteKnight).toBeCalledWith('1');
    });

    it('should throw an error if the knight is not found', async () => {
      mockKnightsService.getKnightById.mockResolvedValue(null);

      await expect(knightController.deleteKnight({ id: '1' })).rejects.toThrow();
      expect(mockKnightsService.getKnightById).toBeCalledWith('1');
    });
  });
});
