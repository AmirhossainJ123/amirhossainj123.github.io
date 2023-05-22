//           __________________________________________________________________
//          /                                                                  \
//         |====================================================================|
//         |                                                                    |
//         |  this is example plugin to show you how to make your own plugins!  |
//         |                                                                    |
//         |====================================================================|
//          \__________________________________________________________________/

// I actually tried to make it as simple as how you use this entire thing ;d

// Rule Numbir One!
// Everything must be in function called PluginMain()
function PluginMain() {
    // First we define our Plugin Name and Description
    let Plugin_Name = "Example"
    let Plugin_Description = `Example Plugin To Show You How To Make Your Own!`
    let Example_Plugin = new DatapackMakerPlugin(Plugin_Name,Plugin_Description)

    // In order to add a Element to Plugin Functions you can do
    Example_Plugin.AddButton("A Element which does absolutely nothing at all '\\_(O.O)_/'")
    // as you see its pretty simple to define a element
    // and if you ever wanted it to have input from the user you can put it inside < and >
    // if you put <number> there it automatically changes the input type as number only, and <yes/no> changes it to Check or Uncheck only
    // ok defining useless buttons is enough lets just define an actual useful button!
    // so now we want our user be able to rain bomb anywhere he likes ;d
    // we can use this: Example_Plugin.AddButton("Rain Bomb at ~<x> ~<z>, they fall from <y> blocks, we have <number>x tnt")
    // but as said before we don't want to make useless buttons so lets just add a function to it too!
    // always get something at the first argument, even if you are not going to add any lines!
    // its necessary! it just must be there
    // also the arguments given to this function is sorted so x is x and y is y and z is z and count is number
    // don't put any extra required arguments that are not given in the button, it might just break everything
    // your own arguments must be in [ and ]
    let rainBomb = (code,[x,y,z,count]) => {
        // in order to add lines to the mcfunction code do
        // Example_Plugin.AddLine()
        for (let index = 0; index < count; index++) {
            code.AddLine(`summon tnt ~${x} ~ ~${z} {Tags:["TNT_RAIN"],Fuse:200}`)
            code.AddLine("spreadplayers ~ ~ 5 20 true @e[tag=TNT_RAIN]")
            code.AddLine(`tp @e[tag=TNT_RAIN] ~ ~${y} ~`)
            code.AddLine(`tag @e[tag=TNT_RAIN] remove TNT_RAIN`)
        }
        // all functions must end with return code, THATS IMPORTANT
        return code;
    }
    // now that we defined that lets define our button!
    // in order to add a function to a button we put it after the text of the button
    // BUT without any like type of ( and ) or anything just put it there
    Example_Plugin.AddButton("Rain Bomb at ~<x> ~<z>, they fall from <y> blocks, we have <number>x tnt", rainBomb)
    // I think thats enough for the example plugin
    // If you would like to test if your plugin works you can just type of do a lil console log
    console.log("Finished")
}