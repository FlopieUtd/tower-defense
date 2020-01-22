import {observable} from 'mobx';
import { uuid } from 'uuidv4';
import { PositionType } from '../models/Position';


export class TowerBlueprint {
    radius: number;
    shootsEveryNthTick: number;
    damagePerShot: number;
    type: string;
    cost: number;
    color: string;
    armorPiercing: boolean;
    targetsGround: boolean;
    targetsAir: boolean;

    constructor(blueprint) {
        const {  
            radius,
            shootsEveryNthTick,
            damagePerShot,
            type,
            cost,
            color,
            armorPiercing,
            targetsGround,
            targetsAir
        } = blueprint;

        this.radius = radius;
        this.shootsEveryNthTick = shootsEveryNthTick;
        this.damagePerShot = damagePerShot;
        this.type = type;
        this.cost = cost;
        this.color = color;
        this.armorPiercing = armorPiercing;
        this.targetsGround = targetsGround;
        this.targetsAir = targetsAir; 
    }
}


export class Tower extends TowerBlueprint {
    id: string;
    @observable position: PositionType;
    @observable isFiring: boolean;
    @observable ticksUntilNextShot: number;

    constructor(blueprint: TowerBlueprint) {
        super(blueprint);
        this.id = uuid();
    }



    

}

