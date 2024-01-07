/* eslint-disable @typescript-eslint/no-unused-vars */

import { __getDatabaseGlobalType, getNativeByName } from "@war3js/unsafe";
import { InstanceApiBuilder } from "./services/ClassBuilder.js";
import { AbilityData } from "./handles/instanceApi/AbilityData.js";

const x = new InstanceApiBuilder();

x.appendAbilityData(AbilityData);

const y = new AbilityData(0) as any;
y.blAlwaysAutocastFae2[0] = true;

debugger;
