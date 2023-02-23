// Main Page Stuff ---------------------------------------------------------------------------------------------------------------

function theme_set(link,clr) {
    const boxes = document.querySelectorAll('.Connecties');
    boxes.forEach(box => {
        box.style.animation = "refresh 0.3s ease-in 1 0s normal forwards"
        setTimeout(()=>{
            box.style.animation = ""
        },300)
        setTimeout(()=>{
            box.style.backgroundImage = link;
            box.style.color = clr;
        },150)
    });
}

function theme(num) {
    if (num == 0)
        theme_set("","black")
    if (num == 1)
        theme_set("url('Assets/gold_texture.jpg')","black")
    if (num == 2)
        theme_set("url('Assets/program.jpeg')","white")
    if (num == 3)
        theme_set("url('Assets/wall.jpg')","")
}

function ConvertFor(Array) {return JSON.stringify(Array);}
function ConvertBack(Array) {return JSON.parse(Array);}

Elements = []
Events = ["On World Load",
    "On World Tick"];

Functions = ["Kill <player/selector>",
    "Kill <entity>",
    "Spawn <entity> ~<x> ~<y> ~<z> with <tags>",
    "Give <player/selector> <count>x <item>",
    "Give <player/selector> <count>x <var custom item>",
    "Place <block> ~<x> ~<y> ~<z>",
    "Set time to <time>",
    "Run The Next <number> Command At ~<x> ~<y> ~<z>",
    "Run The Next <number> Command At ^<x> ^<y> ^<z>",
    "Run The Next <number> Command At <x> <y> <z>",
    "Run The Next <number> Command From <entity>",
    "Run The Next <number> Command From <player/selector>",
    "Teleport <player/selector> ~<x> ~<y> ~<z>",
    "Teleport <entity> ~<x> ~<y> ~<z>",
    "Send message in chat, visible for <player/selector>: <message>",
    "Display on <player/selector>'s screen as title: <message>",
    "Display on <player/selector>'s screen as subtitle: <message>",
    "Display on <player/selector>'s screen as actionbar: <message>",
    "Apply Force ~<number> ~<number> ~<number> to <entity>",
    "Apply Force to <entity> in the direction of <entity> with power factor <number>",
    "Apply Force to <entity> in the direction of <player/selector> with power factor <number>"];

Informations = ["<var number> = <player/selector>'s Health",
    "<var number> = <player/selector>'s Food",
    "<var number> = <player/selector>'s Death Count",
    "<var number> = <player/selector> Amount of dealt damage",
    "<var number> = <player/selector> Amount of taken damage"];

Variables = ["Define <var number> as <number>",
    "<var number> += <var number>",
    "<var number> -= <var number>",
    "<var number> *= <var number>",
    "<var number> /= <var number>",
    "<var number> = if [<var number> = <var number>]",
    "<var number> = if [<var number> > <var number>]",
    "<var number> = if [<var number> < <var number>]",
    "<var number> = if [<entity> exists]",
    "<var number> = if [block at ~<x> ~<y> ~<z> is <block>]",
    "<var number> = if [biome at ~<x> ~<y> ~<z> is <biome>]",
    "Define <var custom item> as <item name>",
    "<var custom item>'s name = <name>",
    "<var custom item>'s enchantments += <enchantment name> <enchantment level>",
    "<var custom item>'s lore += <lore>",
    "<var custom item> is unbreakable = <yes/no>",
    "<var custom item> invisible enchantments = <yes/no>",
    "<var custom item> damage = <number>"
];
                                    
Loops = [
    "If <var> run the next <number> command",
    "Unless <var> run the next <number> command"];
FullCode = [[],[]]
CurrentCode = 0
FullCode[CurrentCode] = Elements
Elements = FullCode[CurrentCode]
All = [Events,Functions,Informations,Variables,Loops]
toggle = [false,false,false,false,false]
function visible(num) {
    Classes = ["eve","fun","inf","var","loo"]
    num--;
    Curasses = Classes[num]
    check = toggle[num]
    if (!check) {
        document.getElementById("Keys"+(num+1)).className = Curasses + " expandable"
        let Vis = All[num]
        toggle[num] = true
        for (x = 0; x<Vis.length; x++) {
            let button = document.createElement('button')
            button.innerText= Vis[x]
            button.id="Sub" + num+1
            button.className = "subutton"
            button.setAttribute("onclick","visible(" + (num+1) + "); AddElement(" + num + "," + x + ")")
            document.getElementById("Keys"+(num+1)).append(button);
        }
    }
    else {
        document.getElementById("Keys"+(num+1)).className = Curasses
        toggle[num] = false
        let Vis = All[num]
        for (x = 0; x<Vis.length; x++) {
            document.getElementById("Sub"+num+1).remove()
        }
    }
}
Store = []
function inputset() {
    for (x=0;x<Elements.length+1;x++) {
        var Exist = false;
        var filled = 0
        for (y=0;y<10;y++) {
            try {
                A = document.getElementById("input_" + x + "_" + y).value
                Exist = true;
            } catch(err) {
                console.error("I hate this")
            }
            if (Exist) {
                filled++
                Elements[x][1][y] = "false"
                if (document.getElementById("input_" + x + "_" + y).checked)
                    Elements[x][1][y] = "true"
                else
                    Elements[x][1][y] = document.getElementById("input_" + x + "_" + y).value
                Exist = false
                resize(x,y)
            }
        }
    }
}
function resize(x,y) {
    dude = document.getElementById("input_" + x + "_" + y)
    if (!(dude.type == "checkbox")) {
        dude.style.width = dude.value.length+1 + "ch";
        if (dude.type == "number")
            dude.style.width = dude.value.length+3 + "ch";
    }
}
function refresh(func,aply) {
    for (x = 0; x<Elements.length+1; x++) {
        for (x = 0; x<Elements.length+1; x++) {
            try {
                document.getElementById("Pos_"+x).remove()
            } catch(err) {
                console.error("I hate this more")
            }
        }
    }
    for (x = 0; x<Elements.length; x++) {
        let sortment = document.createElement('div')
        sortment.className = "sort"
        sortment.id="Pos_"+x
        document.getElementById("preview").append(sortment)
        let button = document.createElement('div')
        button.id="Layer_" + x
        button.className = "Connecties"
        if (!Elements[x][3]) {
            Elements[x][3] = true
            button.style.animation = "Connected 0.3s ease-out 1 normal forwards"
        }
        if (!Elements[x][4]) {
            Elements[x][4] = true
            button.style.animation = "Moveback 0.3s ease-out 1 normal forwards"
        }
        sortment.append(button);
        var innerstuff = ""
        var toggle = true
        var num = 0;
        var inputValue = "";
        var inputValueZ = "";
        var hasspace = false
        var hasseen = false
        for (y=0;y<Elements[x][0].length;y++) {
            if (Elements[x][0][y] == "<") {
                toggle = false
                var current = document.createElement('h3')
                current.id="text_"+x+"_"+num
                current.className = "ctext"
                current.innerText = innerstuff
                if (innerstuff[0] == " ")
                    current.className = "ctext spaced"
                button.append(current); 
                if (innerstuff[innerstuff.length-1] == " ")
                    hasspace = true
                else
                    hasspace = false
                innerstuff = ""
                hasseen = true
            }
            if (Elements[x][0][y-1] == ">")  {
                toggle = true
            }
            if (Elements[x][0][y] == ">") {
                if (hasseen) {
                var input = document.createElement('input')
                input.id="input_" + x + "_" + num
                if (inputValue.replaceAll("<","").replaceAll(">","").replaceAll(" ","") == "yes/no") {
                    input.setAttribute("type","checkbox")
                    if (hasspace)
                        input.className = "chockbox spaced"
                    else
                        input.className = "chockbox"
                    }
                else if (inputValue.replaceAll("<","").replaceAll(">","").replaceAll(" ","") == "number" || inputValue.replaceAll("<","").replaceAll(">","").replaceAll(" ","") == "count") {
                    input.setAttribute("type","number")
                    if (hasspace)
                        input.className = "inputfunn spaced"
                    else
                        input.className = "inputfunn"
                    }
                else {
                    if (hasspace)
                        input.className = "inputfun spaced"
                    else
                        input.className = "inputfun"
                    }
                if (!(Elements[x][1][num] == "" || Elements[x][1][num] == undefined))
                    inputValue = Elements[x][1][num]
                    input.checked = false
                    if (Elements[x][1][num] == "true")
                        input.checked = true
                    else
                        input.value = inputValue.replaceAll("<","").replaceAll(">","")
                    input.setAttribute("onchange","inputset();")
                    num++
                button.append(input);
                inputValue = ""
                hasseen = false
                }
            }
            if (toggle)
                innerstuff += Elements[x][0][y]
            else
                inputValue += Elements[x][0][y]
        }
        var current = document.createElement('h3')
        current.id="text_"+y
        current.className = "ctext"
        current.innerText = innerstuff
        button.append(current);
        innerstuff = ""
        let button_del = document.createElement('button')
        button_del.id="btns"
        button_del.className = "dlt"
        button_del.setAttribute("onclick","DeleteElement(" + x + ")")
        button.append(button_del);
        let icon = document.createElement("i")
        icon.id="btns"
        icon.className = "material-icons"
        icon.innerText = "delete_forever"
        button_del.append(icon)
        if (Elements.length > 1 && x != 0) {
            let button_up = document.createElement('button')
            button_up.innerText= ""
            button_up.id="btns"
            button_up.className = "up"
            button_up.setAttribute("onclick","MoveUpElement(" + x + ")")
            button.append(button_up);
            let icons = document.createElement("i")
            icons.id="btns"
            icons.className = "material-icons"
            icons.innerText = "arrow_upward"
            button_up.append(icons)
        }
        if (Elements.length > 1 && x != Elements.length-1) {
            let button_down = document.createElement('button')
            button_down.innerText= ""
            button_down.id="btns"
            button_down.className = "down"
            button_down.setAttribute("onclick","MoveDownElement(" + x + ")")
            button.append(button_down);
            let iconz = document.createElement("i")
            iconz.id="btns"
            iconz.className = "material-icons"
            iconz.innerText = "arrow_downward"
            button_down.append(iconz)
        }
    }
}
function DeleteElement(x) {
if (x > -1) {
    Elements.splice(x, 1);
}
document.getElementById("Layer_" + x).style.animation = "Delete 0.3s ease-out 1 normal forwards"
setTimeout(()=>{
    refresh()
    inputset()
},350)
}
function AddElement(num, x) {
if (num != 0) {
    let Element = All[num][x] // num = category, x = code
    Elements[Elements.length] = [Element,["","","","","","","","","",""],[num,x],false,true]
}
else {
    FullCode[CurrentCode] = Elements
    CurrentCode = x
    Elements = FullCode[CurrentCode]
    document.getElementById("preview").innerText = "Preview - " + All[num][x]
}
refresh()
inputset()
}
function MoveUpElement(x) {
document.getElementById("Layer_" + x.toString()).style.animation = "Moving 0.3s ease-out 1 normal forwards"
document.getElementById("Layer_" + (x-1).toString()).style.animation = "Moving 0.3s ease-out 1 normal forwards"
temp = Elements[x-1]
Elements[x-1] = Elements[x]
Elements[x] = temp
setTimeout(()=>{
    Elements[x][4] = false
    Elements[x-1][4] = false
    refresh()
    inputset()
},350)
}
function MoveDownElement(x) {
document.getElementById("Layer_" + x).style.animation = "Moving 0.3s ease-out 1 normal forwards"
document.getElementById("Layer_" + parseInt(parseInt(x)+1)).style.animation = "Moving 0.3s ease-out 1 normal forwards"
temp = Elements[x+1]
Elements[x+1] = Elements[x]
Elements[x] = temp
setTimeout(()=>{
    Elements[x][4] = false
    Elements[parseInt(x)+1][4] = false
    refresh()
    inputset()
},350)
}












// COMPILATION PART -----------------------------------------------------------------------------------------------------------------

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
                    Code[filler] = "execute positioned ^" + Info[index][1][1] + " ^" + Info[index][1][2] + " ^" + Info[index][1][3] + " run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 9) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute positioned " + Info[index][1][1] + " " + Info[index][1][2] + " " + Info[index][1][3] + " run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 10) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute as @e[type=" + Info[index][1][1].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase() + "] at @s run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 11) {
                filler = filled_lines
                for (x = 0; x < Info[index][1][0]; x++) {
                    Code[filler] = "execute as " + Info[index][1][1] + " at @s run "
                    filler++;
                }
            }
            if (Info[index][2][1] == 12) {
                Code[filled_lines] += "tp "  + Info[index][1][0] + " ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 13) {
                Code[filled_lines] += "tp @e[type="  + Info[index][1][0].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase() + "] ~" + Info[index][1][1] + " ~" + Info[index][1][2] + " ~" + Info[index][1][3]
                filled_lines++;
            }
            if (Info[index][2][1] == 14) {
                Code[filled_lines] += "tellraw "  + Info[index][1][0] + ' {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 15) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' title {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 16) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' subtitle {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 17) {
                Code[filled_lines] += "title "  + Info[index][1][0] + ' actionbar {"text":"' + Info[Index][1][1].replaceAll("&","§") + '"}'
                filled_lines++;
            }
            if (Info[index][2][1] == 18) {
                Code[filled_lines] += `execute as @e[type=${Info[index][1][3].replaceAll(" and ",",").replaceAll(" with ",",").replaceAll(" being ","=").replaceAll(" is ","=").replaceAll(" ","_").toLowerCase()}] run data merge entity @s {Motion:[${(parseFloat(Info[index][1][0])).toString()},${(parseFloat(Info[index][1][1])).toString()},${(parseFloat(Info[index][1][2])).toString()}]}`
                filled_lines++;
            }
            if (Info[index][2][1] == 19) {
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
            if (Info[index][2][1] == 20) {
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






// THE END ------------------------------------------------------------------------------------------------------------------