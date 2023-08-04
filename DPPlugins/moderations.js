function PluginMain() {
    let Plugin_Name = "Moderations"
    let Plugin_Description = `This plugin lets you do moderation stuff`
    let Plugin = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
    let Ban = (code,[username,reason,banip]) => {
        if (banip)
            code.AddLine(`ban-ip ${username} ${reason}`)
        else
            code.AddLine(`ban ${username} ${reason}`)
        return code
    }
    Plugin.AddButton("Ban <user> for <reason>, ban ip: <yes/no>",Ban)
    let Kick = (code,[username,reason]) => {
        code.AddLine(`kick ${username} ${reason}`)
        return code
    }
    Plugin.AddButton("Kick <user> for <reason>",Kick)
    let Unban = (code,[username,unbanip]) => {
        if (unbanip)
            code.AddLine(`pardon-ip ${username}`)
        else
            code.AddLine(`pardon ${username}`)
        return code
    }
    Plugin.AddButton("UnBan <user>, unban ip: <yes/no>",Unban)
    Plugin.AddButton("Stop the server",(code) => {code.AddLine("stop"); return code})
}