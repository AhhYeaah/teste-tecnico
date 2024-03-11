import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from 'src/database/Attributes';

export class WeaponEntity {
  @ApiProperty({
    type: String,
    description: 'The name of the weapon',
    example: 'Excalibur',
  })
  name: string;
  @ApiProperty({
    type: Number,
    description: 'The modifier of the weapon',
    example: 3,
  })
  mod: number;
  @ApiProperty({
    type: String,
    description: 'The attribute the weapon modifies',
    example: AttributeType.STRENGTH,
    enum: AttributeType,
  })
  attr: AttributeType;

  @ApiProperty({
    type: Boolean,
    description: 'If the weapon is equipped or not',
    example: true,
  })
  equipped: boolean;
}
