import { ApiProperty } from '@nestjs/swagger';

export class AttributesEntity {
  @ApiProperty({
    type: Number,
    description: 'The strength of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  strength?: number;
  @ApiProperty({
    type: Number,
    description: 'The dexterity of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  dexterity?: number;

  @ApiProperty({
    type: Number,
    description: 'The constitution of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  constitution?: number;

  @ApiProperty({
    type: Number,
    description: 'The intelligence of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  intelligence?: number;

  @ApiProperty({
    type: Number,
    description: 'The wisdom of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  wisdom?: number;

  @ApiProperty({
    type: Number,
    description: 'The charisma of the knight',
    minimum: 8,
    maximum: 20,
    example: 20,
  })
  charisma?: number;
}
