function PluginMain() {
    let Plugin_Name = "Slot/Inventory+"
    let Plugin_Description = `This plugin gives you more information about player inventory`
    let Plugin = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)

    let HasInventory = (code,[num,player,item]) => {
        code.AddLine(`execute as ${player} if entity @s[nbt={Inventory:[{id:"${item}"}]}] run scoreboard players set ${num} CONST_NUMBERS 1`);
        code.AddLine(`execute as ${player} unless entity @s[nbt={Inventory:[{id:"${item}"}]}] run scoreboard players set ${num} CONST_NUMBERS 0`);
        return code
    }
    Plugin.AddButton("<var number> = Does <player/selector> have <item>",HasInventory)

    let Holding = (code,[num,player,item]) => {
        code.AddLine(`execute as ${player} if entity @s[nbt={SelectedItem:{id:"${item}"}}] run scoreboard players set ${num} CONST_NUMBERS 1`);
        code.AddLine(`execute as ${player} unless entity @s[nbt={SelectedItem:{id:"${item}"}}] run scoreboard players set ${num} CONST_NUMBERS 0`);
        return code
    }
    Plugin.AddButton("<var number> = Is <player/selector> holding <item>",Holding)

    let IsSlot = (code,[num,slot,player,item]) => {
        code.AddLine(`execute as ${player} if entity @s[nbt={Inventory:{Slot:${slot}b,id:"${item}"}}] run scoreboard players set ${num} CONST_NUMBERS 1`);
        code.AddLine(`execute as ${player} unless entity @s[nbt={Inventory:{Slot:${slot}b,id:"${item}"}}] run scoreboard players set ${num} CONST_NUMBERS 0`);
        return code
    }
    Plugin.AddButton("<var number> = Is slot <slot> in <player/selector>'s inventory a <item>",IsSlot)

    let SSlot = (code,[num,player]) => {
        code.AddLine(`execute as ${player} store result score ${num} CONST_NUMBERS run data get entity @s SelectedItemSlot`);
        return code
    }
    Plugin.AddButton("<var number> = Get current selected slot index in <player/selector>'s hotbar",SSlot)

    let StorePlayerInv = (code,[player,x,y,z]) => {
        code.AddLine(`data modify block ~${x} ~${y} ~${z} Items set from entity ${player} Inventory`);
        return code
    }
    Plugin.AddButton("Create a copy of <player/selector>'s inventory in a chest in ~<x> ~<y> ~<z>",StorePlayerInv)
}