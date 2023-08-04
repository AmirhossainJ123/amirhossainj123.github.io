function PluginMain() {
	let Plugin_Name = "Useful Func"
	let Plugin_Description = `Adds a lot of useful functions!`
	let PlayerCause = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)

    let AntiMobAttack = (code, []) => {
		code.AddLoadLine('team add UsefulFuncPluginDatapackMakerTeam "Useful Functions Team"')
		code.AddLoadLine('team modify UsefulFuncPluginDatapackMakerTeam friendlyFire false')
		code.AddTickEndLine('team join UsefulFuncPluginDatapackMakerTeam @e')
	}
	PlayerCause.AddButton("Make all mobs peaceful (any hostile or neutral mob won't attack anyone anymore)", AntiMobAttack)

	let HideNames = (code, []) => {
		code.AddLoadLine('team add UsefulFuncPluginDatapackMakerTeam "Useful Functions Team"')
		code.AddLoadLine('team modify UsefulFuncPluginDatapackMakerTeam nametagVisibility never')
		code.AddTickEndLine('team join UsefulFuncPluginDatapackMakerTeam @a')
	}
	PlayerCause.AddButton("Hide Player Names (people names are hidden completely)", HideNames)

	
}