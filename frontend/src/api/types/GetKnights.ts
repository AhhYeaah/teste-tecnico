import { AttributeType } from "@utils/types/AttributesEntity";

export type GetKnightInput = {
  filter?: "heroes";
};
export type GetKnightOutput = {
  _id: string;
  nome: string;
  idade: number;
  armas: number;
  atributo: AttributeType;
  ataque: number;
  exp: number;
}[];
