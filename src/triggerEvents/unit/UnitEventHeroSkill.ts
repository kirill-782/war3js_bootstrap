import { GetLearnedSkill, GetLearnedSkillLevel } from "../../utils/common.js";
import { TriggerUnitEvent } from "./TriggerUnitEvent.js";

export class UnitEventHeroSkill extends TriggerUnitEvent<"heroSkill"> {
    readonly learnedSkill: number;
    readonly learnedSkillLevel: number;
    constructor() {
        super("heroSkill");
        this.learnedSkill = GetLearnedSkill();
        this.learnedSkillLevel = GetLearnedSkillLevel();
    }
}
