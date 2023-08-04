function PluginMain() {
    let Plugin_Name = "Epic Theme!"
    let Plugin_Description = `This plugin adds a epic theme, not all remember this but its just epic!`
    new DatapackMakerPlugin(Plugin_Name,Plugin_Description)
    let theme = document.createElement("video")
    theme.src = `https://yt3.googleusercontent.com/ytc/AGIKgqOhPP98VwQZwXLebfd24n9SSbXVLipeFZQLJfsX=s900-c-k-c0x00ffffff-no-rj`
    theme.style.height = "50vh"
    theme.style.width = "100vw"
    theme.style.position = "absolute"
    theme.style.zIndex = "9999"
    theme.setAttribute("autoplay","")
    theme.setAttribute("loop","")
    theme.src = "https://media.vlipsy.com/vlips/MzCA8MQv/480p.mp4"
    document.body.appendChild(theme)
    loopybaka = () => {
        setTimeout(() => {
            document.querySelector("video").play()
            loopybaka()
        },500)
    }
    setTimeout(() => {
        loopybaka()
    },1000)
}