function PluginMain() {
	let Plugin_Name = "Player Cause"
	let Plugin_Description = `Adds a lot of detection stuff`
	let PlayerCause = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)

    let DiedNow = (code, []) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Death deathCount")
        code.AddTickEndLine("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Death=1..}] run scoreboard players set @s PlayerCause.DatapackMakerPlugin.Death 0")
        code.AddCond("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Death=1..}] run ")
	}
	PlayerCause.AddButton("Run the next command as the person who just died", DiedNow)

    let SneakNow = (code, []) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Sneak custom:sneak_time")
        code.AddTickEndLine("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Sneak=1..}] run scoreboard players set @s PlayerCause.DatapackMakerPlugin.Sneak 0")
        code.AddCond("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Sneak=1..}] run ")
	}
	PlayerCause.AddButton("Run the next command as the person who just snuck", SneakNow)

    let KillNow = (code, []) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Kill totalKillCount")
        code.AddTickEndLine("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Kill=1..}] run scoreboard players set @s PlayerCause.DatapackMakerPlugin.Kill 0")
        code.AddCond("execute as @a[scores={PlayerCause.DatapackMakerPlugin.Kill=1..}] run ")
	}
	PlayerCause.AddButton("Run the next command as the person who just killed someone (it can be non-players too!)", KillNow)

    
    let KillNow2 = (code, []) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.KillP playerKillCount")
        code.AddTickEndLine("execute as @a[scores={PlayerCause.DatapackMakerPlugin.KillP=1..}] run scoreboard players set @s PlayerCause.DatapackMakerPlugin.KillP 0")
        code.AddCond("execute as @a[scores={PlayerCause.DatapackMakerPlugin.KillP=1..}] run ")
	}
	PlayerCause.AddButton("Run the next command as the person who just killed a person (Player Only!)", KillNow2)

    let HealthCondition = (code, [number,above,below,equal]) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Health health")
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Numeric dummy")
        code.AddLoadLine("scoreboard players set N" + number + " PlayerCause.DatapackMakerPlugin.Numeric " + number)
        if (above && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Health >= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (above && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Health > N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Health <= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Health < N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Health = N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
	}
	PlayerCause.AddButton("Run the next command as who's health is <number> ((Above: <yes/no>, Below: <yes/no>) OR Equal: <yes/no>)", HealthCondition)

    let FoodCondition = (code, [number,above,below,equal]) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Food food")
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Numeric dummy")
        code.AddLoadLine("scoreboard players set N" + number + " PlayerCause.DatapackMakerPlugin.Numeric " + number)
        if (above && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Food >= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (above && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Food > N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Food <= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Food < N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Food = N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
	}
	PlayerCause.AddButton("Run the next command as who's food is <number> ((Above: <yes/no>, Below: <yes/no>) OR Equal: <yes/no>)", FoodCondition)

    let ArmorCondition = (code, [number,above,below,equal]) => {
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Armor armor")
        code.AddLoadLine("scoreboard objectives add PlayerCause.DatapackMakerPlugin.Numeric dummy")
        code.AddLoadLine("scoreboard players set N" + number + " PlayerCause.DatapackMakerPlugin.Numeric " + number)
        if (above && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Armor >= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (above && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Armor > N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Armor <= N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else if (below && !equal)
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Armor < N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
        else
            code.AddCond("execute as @a if score @s PlayerCause.DatapackMakerPlugin.Armor = N" + number + " PlayerCause.DatapackMakerPlugin.Numeric run ")
	}
	PlayerCause.AddButton("Run the next command as who's armor is <number> ((Above: <yes/no>, Below: <yes/no>) OR Equal: <yes/no>)", ArmorCondition)
}