import { Model } from 'mongoose';
import { KnightDocument } from 'src/database/Knight';

export enum FilterTypes {
  HEROES = 'heroes',
  ALL = 'all',
  //Can be implemented
}

export interface Filter {
  find: (dbInstance: Model<KnightDocument>, args?: unknown) => Promise<KnightDocument[]>;
}
