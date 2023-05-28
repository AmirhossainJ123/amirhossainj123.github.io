function PluginMain() {
    let Plugin_Name = "Time"
    let Plugin_Description = `Time control for the datapack maker!`
    let TimeControl = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
    na = ''
    let Control = (code, [name]) => {
        code.AddLoadLine(`scoreboard objectives add tc_${name}`)
        na = name
        return code
    }
    TimeControl.AddButton("Time control init variables - scoreboard <name>",Control)
    ids = {}
    let Delay = (code, [pl, ticks]) => {
        code.AddTickLine(`scoreboard players add control${pl} tc_${na} 1`)
        code.AddLine(`execute if score control${pl} tc_${na} matches ${ticks}.. run `)
        ids[pl] = ticks
        code.line--
        return code
    }
    TimeControl.AddButton("Delay line below (id <id>) by ticks(20 tick = 1 sec): <number>",Delay)
    let EnDelay = (code, [pl, ticks]) => {
        code.AddLine(`execute if score control${pl} tc_${na} matches ${ids[pl]}.. run scoreboard players set control${pl} tc_${na} 0`)
        return code
    }
    TimeControl.AddButton("End Delay with ID <id>",EnDelay)
    console.log("Time control by binbinuser added!")
}