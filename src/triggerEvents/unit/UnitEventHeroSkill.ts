import { GetLearnedSkill, GetLearnedSkillLevel } from "../../utils/common.js";
import { UnitEvent } from "./UnitEvent.js";

export class UnitEventHeroSkill extends UnitEvent<"heroSkill"> {
    readonly learnedSkill: number;
    readonly learnedSkillLevel: number;
    constructor() {
        super("heroSkill");
        this.learnedSkill = GetLearnedSkill();
        this.learnedSkillLevel = GetLearnedSkillLevel();
    }
}
