import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from 'src/database/Attributes';
import { KnightDocument } from 'src/database/Knight';

export class KnightDto {
  @ApiProperty({
    type: String,
    description: 'The id of the knight',
  })
  _id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the knight',
    example: 'Sir Lancelot',
  })
  nome: string;

  @ApiProperty({
    type: Number,
    description: 'The age of the knight',
    example: 25,
  })
  idade: number;

  @ApiProperty({
    type: Number,
    description: 'The number of weapons the knight has',
    example: 3,
  })
  armas: number;

  @ApiProperty({
    type: String,
    description: 'The main attribute of the knight',
    example: AttributeType.STRENGTH,
    enum: AttributeType,
  })
  atributo: AttributeType;

  @ApiProperty({
    type: Number,
    description: 'The attack value of the knight',
    example: 25,
  })
  ataque: number;

  @ApiProperty({
    type: Number,
    description: 'The experience points of the knight',
    example: 100,
  })
  exp: number;

  constructor(knight: KnightDocument) {
    this._id = knight._id.toString();
    this.nome = knight.name;
    this.idade = knight.age;
    this.armas = knight.weaponNumber;
    this.atributo = knight.equippedWeapon.attr;
    this.ataque = knight.attack;
    this.exp = knight.exp;
  }
}
