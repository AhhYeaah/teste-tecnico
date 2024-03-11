import { AttributeType } from "@utils/types/AttributesEntity";
import { KnightEntity } from "@utils/types/KnightEntity";

export type CreateKnightInput = KnightEntity;
export type CreateKnightOutput = {
  _id: string;
  nome: string;
  idade: number;
  armas: number;
  atributo: AttributeType;
  ataque: number;
  exp: number;
};
