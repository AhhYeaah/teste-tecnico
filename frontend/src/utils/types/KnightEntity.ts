import { AttributeType, AttributesEntity } from "./AttributesEntity";
import { WeaponEntity } from "./WeaponEntity";

export type KnightEntity = {
  name: string;
  nickname: string;
  birthday: string;
  weapons: WeaponEntity[];
  attributes: AttributesEntity;
  keyAttribute: AttributeType;
};
