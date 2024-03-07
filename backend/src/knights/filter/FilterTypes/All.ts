import { Model } from 'mongoose';
import { Filter } from './filter';
import { Knight, KnightDocument } from 'src/database/Knight';

export class AllFilter implements Filter {
  async find(dbInstance: Model<KnightDocument>): Promise<Knight[]> {
    return dbInstance.find();
  }
}
