import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Weapon, WeaponDocument } from "src/database/Weapon";

export class WeaponsService {
    constructor(
        @InjectModel(Weapon.name) private weaponModel: Model<WeaponDocument>
    ){}

    createWeaponBulk(){

}