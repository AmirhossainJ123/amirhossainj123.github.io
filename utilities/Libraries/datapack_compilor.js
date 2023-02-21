function endliner(array) {
    text = ""
    for (let index = 0; index < array.length; index++) {
        text += array[index] + "\n"
    }
    return text
}
function BuildItem(Index,Array) {
    Info = Array[Index] // [Info[index][1][0],Info[index][1][1].replaceAll(" ","_").toLowerCase(),"",[],[],"0b","0b",0]
    text = `${Info[1]}{display:{Name:'"${Info[2]}"',Lore:[`
    for (let index = 0; index < Info[4].length; index++) {
        text += `'"${Info[4][index]}"',`
    }
    text = text.slice(0,-1);
    text += "]},Enchantments:["
    for (let index = 0; index < Info[3].length; index++) {
        text += `{id:"${Info[3][index][0]}",lvl:${Info[3][index][1]}},`
    }
    text = text.slice(0,-1);
    text += `],Unbreakable:${Info[5]}`
    if (Info[6] == "1b")
        text += ",HideFlags:45"
    text += ",damage:" + Info[7] + "}"
    return text
}
function Download(load,tick) {
    tick.unshift(" ")
    load.unshift(" ")
    load.unshift("scoreboard objectives add CONST_HEALTH health")
    load.unshift("scoreboard objectives add CONST_FOOD food")
    load.unshift("scoreboard objectives add CONST_DEATH deathCount")
    load.unshift("scoreboard objectives add CONST_DEALT custom:damage_dealt")
    load.unshift("scoreboard objectives add CONST_TAKEN custom:damage_taken")
    load.unshift("scoreboard objectives add CONST_JUMP custom:jump")
    load.unshift("scoreboard objectives add CONST_NUMBERS dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_X dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_X_PRIME dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_Y dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_Y_PRIME dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_Z dummy")
    load.unshift("scoreboard objectives add CONST_MOTION_Z_PRIME dummy")
    load.unshift("# Constant Scoreboards!")
    load.unshift(" ")

    load = endliner(load)
    tick = endliner(tick)

    const link = document.createElement("a");
    const file = new Blob([load], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "load.mcfunction";
    link.click();
    URL.revokeObjectURL(link.href);

    const linkz = document.createElement("a");
    const filez = new Blob([tick], { type: 'text/plain' });
    linkz.href = URL.createObjectURL(filez);
    linkz.download = "tick.mcfunction";
    linkz.click();
    URL.revokeObjectURL(linkz.href);

    // ZIP PART BABY
    /*const zip = new JSZip();
    zip.file("pack.mcmeta", '{\n    "pack": {\n        "pack_format": 7,\n        "description": "My Datapack"\n    }\n}');
    const loadTag = {
        "values": [
            "MyDatapack:load"
        ]
    }
    const tickTag = {
        "values": [
            "MyDatapack:tick"
        ]
    }
    zip.file("data/minecraft/tags/functions/load.json", JSON.stringify(loadTag));
    zip.file("data/minecraft/tags/functions/tick.json", JSON.stringify(tickTag));
    zip.file('pack.mcmeta', '{\n    "pack": {\n        "pack_format": 10,\n        "description": "Made with AmirhossainJ123\'s datapack maker"\n    }\n}');
    zip.folder('data/minecraft/tags/functions').file('load.json', '{\n   "values": [\n       "[' + datapack + ']:load"\n   ]\n}');
    zip.folder('data/minecraft/tags/functions').file('tick.json', '{\n   "values": [\n       "[' + datapack + ']:tick"\n   ]\n}');
    zip.folder('data/' + datapack + '/functions').file('tick.mcfunction', tick);
    zip.folder('data/' + datapack + '/functions').file('load.mcfunction', load);
    
    zip.generateAsync({ type: "blob" })
    .then(function(content) {
        saveAs(content, "datapack.zip");
    });*/
}
function SearchIn(def,item) {
    for (let index = 0; index < def.length; index++) {
        if (item == def[index][0]) {
            return def[index][1]
        }
    }
}
function SearchIndex(def,item) {
    for (let index = 0; index < def.length; index++) {
        if (item == def[index][0]) {
            return index
        }
    }
}
function Compiler(Info) {
    filled_lines = 0
    Code = []
    Definitions = []
    for (let index = 0; index < Info.length; index++) {
        Index = index
        if (Code[filled_lines] == undefined)
            Code[filled_lines] = ""
        if (Info[index][2][0] == 1)  {
            if (Info[index][2][1] == 0) {
                Code[filled_lines] += "kill "  + Info[index][1][0]
                filled_lines++;
            }
            if (Info[index][2][1] == 1) {
                Code[filled_lines] += "kill @e[type="  + Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase() + "]"
                filled_lines++;
            }
            if (Info[index][2][1] == 2) {
                Tag = Info[index][1][4]
                Tag = Tag.replaceAll(" and ",",").replaceAll(" ","_").split(",") 
                Tags = ""
                Tag.forEach(element => {
                    Tags += '"' + element + '",'
                });
                Tags = Tags.slice(0,-1)
                Code[filled_lines] += "summon "  + Info[index][1][0].toLowerCase().replaceAll(" ","_") + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3] + ' {Tags:[' + Tags.toLowerCase() + "]}"
                filled_lines++;
            }
            if (Info[index][2][1] == 3) {
                Code[filled_lines] += "give "  + Info[index][1][0] + " " + Info[index][1][2].replaceAll(" ","_").toLowerCase() + " " + Info[index][1][1]
                filled_lines++;
            }
            if (Info[index][2][1] == 4) {
                Code[filled_lines] += "give "  + Info[index][1][0] + " " + BuildItem(SearchIndex(Definitions,Info[index][1][2]),Definitions) + " " + Info[index][1][1]
                filled_lines++;
            }
            if (Info[index][2][1] == 5) {
                Code[filled_lines] += "setblock"  + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3] + " " + Info[index][1][0]
                filled_lines++;
            }
            if (Info[index][2][1] == 6) {
                Code[filled_lines] += "time set "  + Info[index][1][0]
                filled_lines++;
            }
            if (Info[index][2][1] == 7) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute positioned ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3] + " run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 8) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute positioned " + Info[index][1][1] + " " + Info[index][1][2] + " " + Info[index][1][3] + " run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 9) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute as @e[type=" + Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase() + "] at @s run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 10) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute as " + Info[index][1][1] + " at @s run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 11) {
                Code[filled_lines] += "tp "  + Info[index][1][0] + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 12) {
                Code[filled_lines] += "tp @e[type="  + Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase() + "] ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 13) {
                Code[filled_lines] += "tellraw "  + Info[index][1][0] + ' {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 14) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' title {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 15) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' subtitle {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 16) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' actionbar {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 17) {
                Code[filled_lines] += `execute as @e[type=${Info[index][1][3].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run data merge entity @s {Motion:[${(parseFloat(Info[index][1][0])).toString()},${(parseFloat(Info[index][1][1])).toString()},${(parseFloat(Info[index][1][2])).toString()}]}`
                filled_lines++;
            }
            if (Info[index][2][1] == 18) {
                SavedFilledLine = Code[filled_lines]
                Code[filled_lines] += `execute as @e[type=${Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] rotated as @s run tp @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] ~ ~ ~`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_X run data get entity @s Pos[0] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Y run data get entity @s Pos[1] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Z run data get entity @s Pos[2] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] rotated as @s eyes run tp @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] ^ ^ ^${Info[index][1][2]/10}`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_X_PRIME run data get entity @s Pos[0] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Y_PRIME run data get entity @s Pos[1] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Z_PRIME run data get entity @s Pos[2] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_X_PRIME -= @s CONST_MOTION_X`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_Y_PRIME -= @s CONST_MOTION_Y`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_Z_PRIME -= @s CONST_MOTION_Z`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[0] double 0.0001 run scoreboard players get @s CONST_MOTION_X_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[1] double 0.0001 run scoreboard players get @s CONST_MOTION_Y_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[2] double 0.0001 run scoreboard players get @s CONST_MOTION_Z_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_X`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Y`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Z`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_X_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Y_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Z_PRIME`
                filled_lines++;
            }
            if (Info[index][2][1] == 19) {
                SavedFilledLine = Code[filled_lines]
                Code[filled_lines] += `execute as ${Info[index][1][1]} rotated as @s run tp @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] ~ ~ ~`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_X run data get entity @s Pos[0] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Y run data get entity @s Pos[1] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Z run data get entity @s Pos[2] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as ${Info[index][1][1]} rotated as @s run tp @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] ^ ^ ^${Info[index][1][2]/10}`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_X_PRIME run data get entity @s Pos[0] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Y_PRIME run data get entity @s Pos[1] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result score @s CONST_MOTION_Z_PRIME run data get entity @s Pos[2] 10000`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_X_PRIME -= @s CONST_MOTION_X`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_Y_PRIME -= @s CONST_MOTION_Y`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players operation @s CONST_MOTION_Z_PRIME -= @s CONST_MOTION_Z`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[0] double 0.0001 run scoreboard players get @s CONST_MOTION_X_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[1] double 0.0001 run scoreboard players get @s CONST_MOTION_Y_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] store result entity @s Motion[2] double 0.0001 run scoreboard players get @s CONST_MOTION_Z_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_X`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Y`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Z`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_X_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Y_PRIME`
                filled_lines++;
                Code[filled_lines] = SavedFilledLine
                Code[filled_lines] += `execute as @e[type=${Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players reset @s CONST_MOTION_Z_PRIME`
                filled_lines++;
            }
        }
        if (Info[index][2][0] == 2)  {
            if (Info[index][2][1] == 0) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_HEALTH"
                filled_lines++;
            }
            if (Info[index][2][1] == 1) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_FOOD"
                filled_lines++;
            }
            if (Info[index][2][1] == 2) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_DEATH"
                filled_lines++;
            }
            if (Info[index][2][1] == 3) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_DEALT"
                filled_lines++;
            }
            if (Info[index][2][1] == 4) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_TAKEN"
                filled_lines++;
            }
            if (Info[index][2][1] == 5) {
                Code[filled_lines] += "execute as "  + Info[index][1][1] + " store result score " + Info[index][1][0] + " CONST_NUMBERS run scoreboard players get entity @s CONST_JUMP"
                filled_lines++;
            }
        }
        if (Info[index][2][0] == 3)  {
            if (Info[index][2][1] == 0) {
                Code[filled_lines] += "scoreboard players set " + Info[index][1][0] + " CONST_NUMBERS " + Info[index][1][1]
                filled_lines++;
            }
            if (Info[index][2][1] == 1) {
                Code[filled_lines] += `scoreboard players operation ${Info[index][1][0]} CONST_NUMBERS += ${Info[index][1][1]} CONST_NUMBERS`
                filled_lines++;
            }
            if (Info[index][2][1] == 2) {
                Code[filled_lines] += `scoreboard players operation ${Info[index][1][0]} CONST_NUMBERS -= ${Info[index][1][1]} CONST_NUMBERS`
                filled_lines++;
            }
            if (Info[index][2][1] == 3) {
                Code[filled_lines] += `scoreboard players operation ${Info[index][1][0]} CONST_NUMBERS *= ${Info[index][1][1]} CONST_NUMBERS`
                filled_lines++;
            }
            if (Info[index][2][1] == 4) {
                Code[filled_lines] += `scoreboard players operation ${Info[index][1][0]} CONST_NUMBERS /= ${Info[index][1][1]} CONST_NUMBERS`
                filled_lines++;
            }
            if (Info[index][2][1] == 5) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if score ${Info[index][1][1]} CONST_NUMBERS = ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless score ${Info[index][1][1]} CONST_NUMBERS = ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 6) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if score ${Info[index][1][1]} CONST_NUMBERS > ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless score ${Info[index][1][1]} CONST_NUMBERS > ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 7) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if score ${Info[index][1][1]} CONST_NUMBERS < ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless score ${Info[index][1][1]} CONST_NUMBERS < ${Info[index][1][2]} CONST_NUMBERS run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 8) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if entity @e[type=${Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless entity @e[type=${Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 9) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if block ~${Info[index][1][1]} ~${Info[index][1][2]} ~${Info[index][1][3]} ${Info[index][1][4].replaceAll(" ","_").toLowerCase()} run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless block ~${Info[index][1][1]} ~${Info[index][1][2]} ~${Info[index][1][3]} ${Info[index][1][4].replaceAll(" ","_").toLowerCase()} run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 10) {
                Chick = Code[filled_lines]
                Code[filled_lines] += `execute if biome ~${Info[index][1][1]} ~${Info[index][1][2]} ~${Info[index][1][3]} ${Info[index][1][4].replaceAll(" ","_").toLowerCase()} run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 1`
                filled_lines++;
                Code[filled_lines] = Chick
                Code[filled_lines] += `execute unless biome ~${Info[index][1][1]} ~${Info[index][1][2]} ~${Info[index][1][3]} ${Info[index][1][4].replaceAll(" ","_").toLowerCase()} run scoreboard players set ${Info[index][1][0]} CONST_NUMBERS 0`
                filled_lines++;
            }
            if (Info[index][2][1] == 11) {
                if (SearchIn(Definitions,Info[index][1][0]) == undefined)
                    Definitions[Definitions.length] = [Info[index][1][0],Info[index][1][1].replaceAll(" ","_").toLowerCase(),"",[],[],"0b","0b",0]
                else
                    Definitions[SearchIndex(Definitions,Info[index][1][0])] = [Info[index][1][0],Info[index][1][1].replaceAll(" ","_").toLowerCase(),"",[],[],"0b","0b",0]
            }
            if (Info[index][2][1] == 12) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][2] = Info[index][1][1]
            }
            if (Info[index][2][1] == 13) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][3][Definitions[SearchIndex(Definitions,Info[index][1][0])][3].length] = [Info[index][1][1],Info[index][1][2]]
            }
            if (Info[index][2][1] == 14) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][4][Definitions[SearchIndex(Definitions,Info[index][1][0])][4].length] = Info[index][1][1]
            }
            if (Info[index][2][1] == 15) {
                if (Info[index][1][1] = "true")
                    Definitions[SearchIndex(Definitions,Info[index][1][0])][5] = "1b"
                else
                    Definitions[SearchIndex(Definitions,Info[index][1][0])][5] = "0b"
            }
            if (Info[index][2][1] == 16) {
                if (Info[index][1][1] = "true")
                Definitions[SearchIndex(Definitions,Info[index][1][0])][6] = "1b"
                else
                Definitions[SearchIndex(Definitions,Info[index][1][0])][6] = "0b"
            }
            if (Info[index][2][1] == 17) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][7] = Info[index][1][1]
            }
        }
        if (Info[index][2][0] == 4)  {
            if (Info[index][2][1] == 0) {
                Code[filled_lines] = "execute if score " + Info[index][1][0] + " CONST_NUMBERS matches 1 run "
            }
            if (Info[index][2][1] == 1) {
                Code[filled_lines] = "execute if score " + Info[index][1][0] + " CONST_NUMBERS matches 1 run "
            }
        }
    }
    return Code
}
function Compile(Code) {return [Compiler(Code[0]),Compiler(Code[1])]}