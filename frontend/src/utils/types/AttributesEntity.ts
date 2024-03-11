export enum AttributeType {
  STRENGTH = "strength",
  DEXTERITY = "dexterity",
  CONSTITUTION = "constitution",
  INTELLIGENCE = "intelligence",
  WISDOM = "wisdom",
  CHARISMA = "charisma",
}

export type AttributesEntity = Partial<Record<AttributeType, number>>;
