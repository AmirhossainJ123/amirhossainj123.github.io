function PluginMain() {
    let Plugin_Name = "White Theme"
    let Plugin_Description = `This plugin, ruins the quality of the datapack maker but it inverts colors!`
    new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
    document.body.style.filter += "invert(1)"
}