PluginButton = []
PButtonFunc = []
InstalledPlugins = [
    {
        name: "Vanilla",
        description: `Default Vanilla Plugin`,
        required: true,
        url: ""
    },
    {
        name: "Example",
        description: `Example Plugin To Show You How To Make Your Own!`,
        required: false,
        url: "Libraries/example_plugin_datapack.js"
    }
]
class DatapackMakerPlugin {
    constructor(Name,Description) {
        InstalledPlugins.push({
            name: Name,
            description: Description,
            required: false,
            url: "noll"
        })
        this.AddButton = (text,func=(code)=>{return code;}) => {
            PluginButton.push(text)
            PButtonFunc.push(func)
        }
    }
}
function DeleteFromSet(Array,Index) {
    let Len = Array.length
    Array[Len] = null
    for (let index = Index; index < Len; index++) {
        Array[index] = Array[index+1]
    }
    Array[Len-1] = null
    return Array
}
function ConvertFor(Array) {
	return JSON.stringify(Array);
}
function ConvertBack(Array) {
	return JSON.parse(Array);
}
function SetVerification(Array) {
    for (let index = 0; index < Array.length; index++) {
        for (let indox = 0; indox < Array.length; indox++) {
            if (index != indox && Array[index] != null && Array[indox] != null && Array[index].url == Array[indox].url)
                Array = DeleteFromSet(Array,index)
        }
    }
    let ArrayFinale = []
    for (let index = 0; index < Array.length; index++) {if (Array[index] != null) ArrayFinale[index] = Array[index]}
    return ArrayFinale
}
function MergeSet(Array1,Array2) {
    Array1 = SetVerification(Array1)
    Array2 = SetVerification(Array2)
    for (let indox = 0; indox < Array2.length; indox++) {
        for (let index = 0; index < Array1.length; index++) {
            if (Array1[index] != null && Array2[indox] != null && Array1[index].url == Array2[indox].url)
                Array1 = DeleteFromSet(Array1,index);
        }
    }
    let ArrayFinale = []
    for (let index = 0; index < Array1.length; index++) {if (Array1[index] != null) ArrayFinale[index] = Array1[index]}
    for (let index = 0; index < Array2.length; index++) {if (Array2[index] != null) ArrayFinale[index] = Array2[index]}
    return ArrayFinale;
}
function loadPlugins() {
	let PluginList = localStorage.getItem("plugins")
    if (PluginList == undefined || PluginList == "undefined" || PluginList == null) {
        localStorage.setItem("plugins",ConvertFor(InstalledPlugins))
    }
    else {
        InstalledPlugins = MergeSet(InstalledPlugins,ConvertBack(PluginList))
    }
    let Len = InstalledPlugins.length
    for (let index = 0; index < Len; index++) {
        var script = document.createElement("script")
        script.src=InstalledPlugins[index].url
        document.head.append(script)
        if (index == Len-1) {
            script.onload = () => {
                PluginMain();
                PluginMain = '';
                InstalledPlugins[InstalledPlugins.length-1].url = InstalledPlugins[index].url
                InstalledPlugins = SetVerification(InstalledPlugins)
            }
            setTimeout(() => {
                InstalledPlugins = SetVerification(InstalledPlugins)
            },1000)
        }
        else {
            script.onload = () => {
                PluginMain();
                PluginMain = '';
                InstalledPlugins[InstalledPlugins.length-1].url = InstalledPlugins[index].url
            }
        }
    }
}
loadPlugins()
function DefineAllTheCommands() {
    Elements = [];
    Events = ["On World Load",
        "On World Tick"
    ];
    Functions = ["Kill <player/selector>",
        "Kill <entity>",
        "Spawn <entity> ~<x> ~<y> ~<z> with <tags>",
        "Spawn <var custom entity> ~<x> ~<y> ~<z> with <tags>",
        "Give <player/selector> <count>x <item>",
        "Give <player/selector> <count>x <var custom item>",
        "Place <block> ~<x> ~<y> ~<z>",
        "Set time to <time>",
        "Run The Next <number> Command At ~<x> ~<y> ~<z>",
        "Run The Next <number> Command At ^<x> ^<y> ^<z>",
        "Run The Next <number> Command At <x> <y> <z>",
        "Run The Next <number> Command From <entity>",
        "Run The Next <number> Command From <player/selector>",
        "Run The Next <number> Command At Position Of <entity>",
        "Run The Next <number> Command At Position Of <player/selector>",
        "Teleport <player/selector> ~<x> ~<y> ~<z>",
        "Teleport <entity> ~<x> ~<y> ~<z>",
        "Send message in chat, visible for <player/selector>: <message>",
        "Display on <player/selector>'s screen as title: <message>",
        "Display on <player/selector>'s screen as subtitle: <message>",
        "Display on <player/selector>'s screen as actionbar: <message>",
        "Apply Force ~<number> ~<number> ~<number> to <entity>",
        "Apply Force to <entity> in the direction of <entity> with power factor <number>",
        "Apply Force to <entity> in the direction of <player/selector> with power factor <number>",
        "Run Command: <command>",
        "Create a explosion with power <number>",
        "Spawn a fireball with explosion <number> and tags are <tags>",
        "Give the effect <effect> <amplifier> for <duration> to the <player/selector>",
        "Give the effect <effect> <amplifier> for <duration> to the <entity>",
        "Clear the effect <effect> from <player/selector>",
        "Clear the effect <effect> from <entity>",
        "Create an area of cloud giving effect <effect> <amplifier> for <duration> with particle being <particle> and in the radius of <number> and tags are <tags>"
    ];

    Informations = ["<var number> = <player/selector>'s Health",
        "<var number> = <player/selector>'s Food",
        "<var number> = <player/selector>'s Death Count",
        "<var number> = <player/selector> Amount of dealt damage",
        "<var number> = <player/selector> Amount of taken damage",
        "<var number> = <player/selector> Amount of jump",
        "<var number> = <player/selector> used <item>",
        "<var number> = <player/selector> is sneaking"
    ];

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
        "<var custom item> damage = <number>",
        "Define <var custom entity> as <entity>",
        "<var custom entity>'s name = <name>",
        "<var custom entity> is silent = <yes/no>",
        "<var custom entity> is giving a ride to <entity>",
        "<var custom entity> is holding <mainhand> and <offhand>",
        "<var custom entity> is wearing <boots> and <leggings> and <chestplate> and <helmet>"
    ];
    Loops = [
        "If <var number> run the next <number> command",
        "Unless <var number> run the next <number> command"
    ];
    PluginButtons = PluginButton
    PButtonFunctions = PButtonFunc 
}
function PluginManager() {
    let project = confirm("if you continue, the page will refresh after the plugin management, so make sure you have saved your project before continuing")
    if (project) {
        let a = prompt("You have currently " + InstalledPlugins.length + " Plugins installed" + "\nIf you want to see the list, type View\nIf you want to add plugin, type Add\nIf you want to remove from the list type Remove\nIf you want us to suggest some plugins, type Plugin","")
        switch (a.toLowerCase()) {
            case "view":
                let numbir = 1;
                txt = ""
                InstalledPlugins.forEach(e => {
                    txt += "Plugin " + numbir + ": " + e.name + "\n"
                    txt += e.description + "\n"
                    numbir++
                });
                alert(txt)
                break;
            case "add":
                let b = prompt("Enter the URL for the plugin:","")
                let New_Plugin = InstalledPlugins
                New_Plugin.push({
                    name: "Unknown Plugin",
                    description: `Unknown Plugin`,
                    required: false,
                    url: b
                })
                localStorage.setItem("plugins",
                    ConvertFor(
                        New_Plugin
                    )
                )
                break;
            case "remove":
                let c = prompt("Enter the ID of the plugin:","")
                let modified = InstalledPlugins
                if (modified[c-1].required == false) {
                    modified.splice(c-1,1)
                    localStorage.setItem("plugins",ConvertFor(modified))
                }
                else alert("Cannot delete that plugin, that plugin is Required")
                break;
            case "plugin":
                open("plugins.txt")
            default:
                break;
        }
        setTimeout(() => {
            window.location.reload()
        },200)
    }
}