import { setToHandleHolder, getNativeByName } from "./unsafe.js";

import { Console } from "./console/Console.js";
import { toHandleHolder } from "./utils/ToHandleHolder.js";
import { HandleBuilder } from "./services/HandleBuilder.js";
import { Widget as CWidget } from "./handles/Widget.js";
import { Unit as CUnit } from "./handles/Unit.js";
import { Player as CPlayer } from "./handles/Player.js";

export const console = new Console();

setToHandleHolder(toHandleHolder);

const builder = new HandleBuilder();

builder.addChainProperty(CWidget, "widget");
builder.addChainProperty(CUnit, "unit");
builder.addChainProperty(CPlayer as any, "player");

export const Widget = CWidget;
export const Unit = CUnit;
export const Player = CPlayer;
