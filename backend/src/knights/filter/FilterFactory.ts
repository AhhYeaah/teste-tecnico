import { ByHeroesFilter } from './FilterTypes/ByHero';
import { Filter, FilterTypes } from './FilterTypes/filter';
import { AllFilter } from './FilterTypes/All';

export class FilterFactory {
  private static enumToFilter: Record<FilterTypes, Filter> = {
    [FilterTypes.HEROES]: new ByHeroesFilter(),
    [FilterTypes.ALL]: new AllFilter(),
  };

  static getFilter(filterType: FilterTypes = FilterTypes.ALL): Filter {
    return this.enumToFilter[filterType];
  }
}
