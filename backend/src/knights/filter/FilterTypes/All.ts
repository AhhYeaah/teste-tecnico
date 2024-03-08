import { Model } from 'mongoose';
import { Filter } from './filter';
import { KnightDocument } from 'src/database/Knight';

export class AllFilter implements Filter {
  async find(dbInstance: Model<KnightDocument>): Promise<KnightDocument[]> {
    return dbInstance.find({
      deletedAt: null,
    });
  }
}
