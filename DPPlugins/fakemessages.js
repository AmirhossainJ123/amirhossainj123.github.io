function PluginMain() {
	let Plugin_Name = "Fake Messages"
	let Plugin_Description = `Creates fake messages in chat`
	let FakeMessages = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
	let JoinMessage = (code, [player]) => {
        code.AddLine(`tellraw @a [{"selector":"${player}","color":"yellow"},{"text":" joined the game.","color":"yellow"}]`)
	}
	FakeMessages.AddButton("Create a fake join message for player called <player>", JoinMessage)
    let LeaveMessage = (code, [player]) => {
        code.AddLine(`tellraw @a [{"selector":"${player}","color":"yellow"},{"text":" left the game.","color":"yellow"}]`)
	}
	FakeMessages.AddButton("Create a fake leave message for player called <player>", LeaveMessage)
    let SentMessage = (code, [message,player]) => {
        code.AddLine(`tellraw @a [{"text":"<","color":"white"},{"selector":"${player}","color":"white"},{"text":"> ${message}","color":"white"}]`)
	}
	FakeMessages.AddButton("Create a fake message saying <message> from player called <player>", SentMessage)
    let DeathMessage = (code, [killer,player]) => {
        code.AddLine(`tellraw @a [{"selector":"${player}","color":"white"},{"text":" was slain by ","color":"white"},{"selector":"${killer}","color":"white"}]`)
	}
	FakeMessages.AddButton("Create a fake death message saying <player> killed <player>", DeathMessage)
}