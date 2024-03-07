import { Model } from 'mongoose';
import { Filter } from './filter';
import { Knight, KnightDocument } from 'src/database/Knight';

export class ByHeroesFilter implements Filter {
  async find(dbInstance: Model<KnightDocument>): Promise<Knight[]> {
    return dbInstance.find({
      deletedAt: {
        $not: null,
      },
    });
  }
}
