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
    load.unshift("scoreboard objectives add CONST_SYSTEM dummy")
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
                Code[filled_lines] += "kill @e[type="  + Info[index][1][0].replaceAll(" and ",",").replaceAll(" is ","=").replaceAll(" the ","") + "]"
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
                Code[filled_lines] += "summon "  + Info[index][1][0].toLowerCase().replaceAll(" ","_") + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3] + ' {Tags:[' + Tags + "]}"
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
                Code[filled_lines] = "execute positioned ~" + Info[index][1][0] + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " run "
            }
            if (Info[index][2][1] == 8) {
                Code[filled_lines] = "execute as @e[type=" + Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" the ","").replaceAll(" ","_").toLowerCase() + "] at @s run "
            }
            if (Info[index][2][1] == 9) {
                Code[filled_lines] = "execute as " + Info[index][1][0] + " at @s run "
            }
            if (Info[index][2][1] == 10) {
                Code[filled_lines] += "tp "  + Info[index][1][0] + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 11) {
                Code[filled_lines] += "tp @e[type="  + Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" the ","").replaceAll(" ","_").toLowerCase() + "] ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 12) {
                Code[filled_lines] += "tellraw "  + Info[index][1][0] + ' {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 13) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' title {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 14) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' subtitle {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 15) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' actionbar {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 16) {
                Code[filled_lines] += `execute as @e[type=${Info[index][1][3].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" the ","").replaceAll(" ","_").toLowerCase()}] run data merge entity @s {Motion:[${(parseFloat(Info[index][1][0])).toString()},${(parseFloat(Info[index][1][1])).toString()},${(parseFloat(Info[index][1][2])).toString()}]}`
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
                if (SearchIn(Definitions,Info[index][1][0]) == undefined)
                    Definitions[Definitions.length] = [Info[index][1][0],Info[index][1][1].replaceAll(" ","_").toLowerCase(),"",[],[],"0b","0b",0]
                else
                    Definitions[SearchIndex(Definitions,Info[index][1][0])] = [Info[index][1][0],Info[index][1][1].replaceAll(" ","_").toLowerCase(),"",[],[],"0b","0b",0]
            }
            if (Info[index][2][1] == 9) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][2] = Info[index][1][1]
            }
            if (Info[index][2][1] == 10) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][3][Definitions[SearchIndex(Definitions,Info[index][1][0])][3].length] = [Info[index][1][1],Info[index][1][2]]
            }
            if (Info[index][2][1] == 11) {
                Definitions[SearchIndex(Definitions,Info[index][1][0])][4][Definitions[SearchIndex(Definitions,Info[index][1][0])][4].length] = Info[index][1][1]
            }
            if (Info[index][2][1] == 12) {
                if (Info[index][1][1] = "true")
                    Definitions[SearchIndex(Definitions,Info[index][1][0])][5] = "1b"
                else
                    Definitions[SearchIndex(Definitions,Info[index][1][0])][5] = "0b"
            }
            if (Info[index][2][1] == 13) {
                if (Info[index][1][1] = "true")
                Definitions[SearchIndex(Definitions,Info[index][1][0])][6] = "1b"
                else
                Definitions[SearchIndex(Definitions,Info[index][1][0])][6] = "0b"
            }
            if (Info[index][2][1] == 14) {
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