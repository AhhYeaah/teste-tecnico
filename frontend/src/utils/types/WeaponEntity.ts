import { AttributeType } from "./AttributesEntity";

export type WeaponEntity = {
  name: string;
  mod: number;
  attr: AttributeType;
  equipped: boolean;
};
