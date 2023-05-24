function PluginMain() {
    let Plugin_Name = "Rain Items"
    let Plugin_Description = `This plugin lets you add the ability to rain items`
    let Plugin = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
    let Ban = (code,[items,x,z,y,count]) => {
        items = items.replaceAll(" ","").split(",")
        for (let index = 0; index < count; index++) {
            code.AddLine(`summon item ~${x} ~ ~${z} {Tags:["ITEM_RAIN"],Item:{id:${items[index%items.length]},Count:1}}`)
            code.AddLine("spreadplayers ~ ~ 5 20 true @e[tag=ITEM_RAIN]")
            code.AddLine(`tp @e[tag=ITEM_RAIN] ~ ~${y} ~`)
            code.AddLine(`tag @e[tag=ITEM_RAIN] remove ITEM_RAIN`)
        }
        return code
    }
    Plugin.AddButton("Rain items [<items seperated by comma>] at ~<x> ~<z> and height <y> and item limit is <count> ",Ban)
}