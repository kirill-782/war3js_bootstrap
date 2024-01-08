import { Destructable } from "./src/handles/Destructable.ts";
import { Handle } from "./src/handles/Handle.ts";
import { Item } from "./src/handles/Item.ts";
import { Player } from "./src/handles/Player.ts";
import { Unit } from "./src/handles/Unit.ts";
import { Widget } from "./src/handles/Widget.ts";
import {
    HEvent,
    JassCodeCallback,
    HLocation,
    HTrigger,
    HTriggerAction,
    HUnitEvent,
    HUnitState,
} from "./src/utils/common.ts";

declare const __ColnfigOnlyBundlePath = "./build/tsup-bundle/index.d.ts";
declare const __ColnfigOnlyFixedBundleOutPath = "./build/fullTypes/bootstrap.d.ts";
declare const __ColnfigOnlyNativesOutPath = "./build/fullTypes/natives.d.ts";
declare const __ColnfigOnlyConstantssOutPath = "./build/fullTypes/constants.d.ts";

interface __ColnfigOnlyTypeToHandle {
    I: number;
    R: number;
    B: boolean;
    S: string;
    V: void;
    C: JassCodeCallback;

    handle: Handle;
    agent: HandleHolder<"agent">;
    player: Player;
    destructable: Destructable;
    widget: Widget;
    unit: Unit;
    event: HEvent;
    item: Item;
    ability: HandleHolder<"ability">;
    buff: HandleHolder<"buff">;
    force: HandleHolder<"force">;
    group: HandleHolder<"group">;
    trigger: HTrigger;
    triggercondition: HandleHolder<"triggercondition">;
    triggeraction: HTriggerAction;
    timer: HandleHolder<"timer">;
    location: HLocation;
    region: HandleHolder<"region">;
    rect: HandleHolder<"rect">;
    boolexpr: HandleHolder<"boolexpr">;
    sound: HandleHolder<"sound">;
    conditionfunc: HandleHolder<"conditionfunc">;
    filterfunc: HandleHolder<"filterfunc">;
    unitpool: HandleHolder<"unitpool">;
    itempool: HandleHolder<"itempool">;
    race: HandleHolder<"race">;
    alliancetype: HandleHolder<"alliancetype">;
    racepreference: HandleHolder<"racepreference">;
    gamestate: HandleHolder<"gamestate">;
    igamestate: HandleHolder<"igamestate">;
    fgamestate: HandleHolder<"fgamestate">;
    playerstate: HandleHolder<"playerstate">;
    playerscore: HandleHolder<"playerscore">;
    playergameresult: HandleHolder<"playergameresult">;
    unitstate: HUnitState;
    aidifficulty: HandleHolder<"aidifficulty">;
    eventid: HandleHolder<"eventid">;
    gameevent: HandleHolder<"gameevent">;
    playerevent: HandleHolder<"playerevent">;
    playerunitevent: HandleHolder<"playerunitevent">;
    unitevent: HUnitEvent;
    limitop: HandleHolder<"limitop">;
    widgetevent: HandleHolder<"widgetevent">;
    dialogevent: HandleHolder<"dialogevent">;
    unittype: HandleHolder<"unittype">;
    projectiletype: HandleHolder<"projectiletype">;
    gamespeed: HandleHolder<"gamespeed">;
    gamedifficulty: HandleHolder<"gamedifficulty">;
    gametype: HandleHolder<"gametype">;
    mapflag: HandleHolder<"mapflag">;
    mapvisibility: HandleHolder<"mapvisibility">;
    mapsetting: HandleHolder<"mapsetting">;
    mapdensity: HandleHolder<"mapdensity">;
    mapcontrol: HandleHolder<"mapcontrol">;
    minimapicon: HandleHolder<"minimapicon">;
    playerslotstate: HandleHolder<"playerslotstate">;
    volumegroup: HandleHolder<"volumegroup">;
    camerafield: HandleHolder<"camerafield">;
    camerasetup: HandleHolder<"camerasetup">;
    playercolor: HandleHolder<"playercolor">;
    placement: HandleHolder<"placement">;
    startlocprio: HandleHolder<"startlocprio">;
    raritycontrol: HandleHolder<"raritycontrol">;
    blendmode: HandleHolder<"blendmode">;
    texmapflags: HandleHolder<"texmapflags">;
    effect: HandleHolder<"effect">;
    effecttype: HandleHolder<"effecttype">;
    weathereffect: HandleHolder<"weathereffect">;
    terraindeformation: HandleHolder<"terraindeformation">;
    fogstate: HandleHolder<"fogstate">;
    fogmodifier: HandleHolder<"fogmodifier">;
    dialog: HandleHolder<"dialog">;
    button: HandleHolder<"button">;
    quest: HandleHolder<"quest">;
    questitem: HandleHolder<"questitem">;
    defeatcondition: HandleHolder<"defeatcondition">;
    timerdialog: HandleHolder<"timerdialog">;
    leaderboard: HandleHolder<"leaderboard">;
    multiboard: HandleHolder<"multiboard">;
    multiboarditem: HandleHolder<"multiboarditem">;
    trackable: HandleHolder<"trackable">;
    gamecache: HandleHolder<"gamecache">;
    version: HandleHolder<"version">;
    itemtype: HandleHolder<"itemtype">;
    texttag: HandleHolder<"texttag">;
    attacktype: HandleHolder<"attacktype">;
    damagetype: HandleHolder<"damagetype">;
    weapontype: HandleHolder<"weapontype">;
    soundtype: HandleHolder<"soundtype">;
    lightning: HandleHolder<"lightning">;
    pathingtype: HandleHolder<"pathingtype">;
    mappedfield: HandleHolder<"mappedfield">;
    mappedtype: HandleHolder<"mappedtype">;
    attachmenttype: HandleHolder<"attachmenttype">;
    bonetype: HandleHolder<"bonetype">;
    animtype: HandleHolder<"animtype">;
    subanimtype: HandleHolder<"subanimtype">;
    cursoranimtype: HandleHolder<"cursoranimtype">;
    image: HandleHolder<"image">;
    ubersplat: HandleHolder<"ubersplat">;
    hashtable: HandleHolder<"hashtable">;
    sprite: HandleHolder<"sprite">;
    projectile: HandleHolder<"projectile">;
    doodad: HandleHolder<"doodad">;
    framehandle: HandleHolder<"framehandle">;
    originframetype: HandleHolder<"originframetype">;
    framepointtype: HandleHolder<"framepointtype">;
    textaligntype: HandleHolder<"textaligntype">;
    frameeventtype: HandleHolder<"frameeventtype">;
    oskeytype: HandleHolder<"oskeytype">;
    mousebuttontype: HandleHolder<"mousebuttontype">;
    agentdatafield: HandleHolder<"agentdatafield">;
    abilityintegerfield: HandleHolder<"abilityintegerfield">;
    abilityrealfield: HandleHolder<"abilityrealfield">;
    abilitybooleanfield: HandleHolder<"abilitybooleanfield">;
    abilitystringfield: HandleHolder<"abilitystringfield">;
    abilityintegerlevelfield: HandleHolder<"abilityintegerlevelfield">;
    abilityreallevelfield: HandleHolder<"abilityreallevelfield">;
    abilitybooleanlevelfield: HandleHolder<"abilitybooleanlevelfield">;
    abilitystringlevelfield: HandleHolder<"abilitystringlevelfield">;
    abilityintegerlevelarrayfield: HandleHolder<"abilityintegerlevelarrayfield">;
    abilityreallevelarrayfield: HandleHolder<"abilityreallevelarrayfield">;
    abilitybooleanlevelarrayfield: HandleHolder<"abilitybooleanlevelarrayfield">;
    abilitystringlevelarrayfield: HandleHolder<"abilitystringlevelarrayfield">;
    unitintegerfield: HandleHolder<"unitintegerfield">;
    unitrealfield: HandleHolder<"unitrealfield">;
    unitbooleanfield: HandleHolder<"unitbooleanfield">;
    unitstringfield: HandleHolder<"unitstringfield">;
    unitweaponintegerfield: HandleHolder<"unitweaponintegerfield">;
    unitweaponrealfield: HandleHolder<"unitweaponrealfield">;
    unitweaponbooleanfield: HandleHolder<"unitweaponbooleanfield">;
    unitweaponstringfield: HandleHolder<"unitweaponstringfield">;
    itemintegerfield: HandleHolder<"itemintegerfield">;
    itemrealfield: HandleHolder<"itemrealfield">;
    itembooleanfield: HandleHolder<"itembooleanfield">;
    itemstringfield: HandleHolder<"itemstringfield">;
    movetype: HandleHolder<"movetype">;
    pathingaitype: HandleHolder<"pathingaitype">;
    collisiontype: HandleHolder<"collisiontype">;
    targetflag: HandleHolder<"targetflag">;
    armortype: HandleHolder<"armortype">;
    heroattribute: HandleHolder<"heroattribute">;
    defensetype: HandleHolder<"defensetype">;
    regentype: HandleHolder<"regentype">;
    unitcategory: HandleHolder<"unitcategory">;
    pathingflag: HandleHolder<"pathingflag">;
    commandbuttoneffect: HandleHolder<"commandbuttoneffect">;
    timetype: HandleHolder<"timetype">;
    variabletype: HandleHolder<"variabletype">;
    renderstage: HandleHolder<"renderstage">;
    jassthread: HandleHolder<"jassthread">;
    handlelist: HandleHolder<"handlelist">;
    textfilehandle: HandleHolder<"textfilehandle">;
}
