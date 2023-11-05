
import { GetLearnedSkill, GetLearnedSkillLevel } from "../../utils/common.js";
import { TriggerUnitEvent } from "./Event.js";

export class TriggerUnitEvenHeroSkill extends TriggerUnitEvent<"heroSkill"> {
    readonly learnedSkill: number;
    readonly learnedSkillLevel: number;
    constructor() {
        super("heroSkill");
        this.learnedSkill = GetLearnedSkill();
        this.learnedSkillLevel = GetLearnedSkillLevel();
    }
}