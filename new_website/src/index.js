toggle = true;
function doci(id) {return document.getElementById(id);}
function darkmodetoggle() {
    let Nodes = document.body.querySelectorAll("*");
    for (let index = 0; index < Nodes.length; index++) {
        if (toggle) {
            Nodes.item(index).classList.remove("darkmode")
            document.body.classList.remove("bodark");
        }
        else if (!Nodes.item(index).classList.contains("NoDarkMode")) {
            Nodes.item(index).classList.add("darkmode")
            document.body.classList.add("bodark");
        }
        if (Nodes.item(index).classList.contains("LightShadeDarkMode")) {
            if (toggle) {
                Nodes.item(index).classList.remove("lsdm")
            }
            else {
                Nodes.item(index).classList.add("lsdm")
            }
        }
    }
}
function clickedonimage() {
    if (toggle)
        doci("logo").className = "bluemode redmode"
    else
        doci("logo").className = "bluemode"
    toggle = !toggle;
    darkmodetoggle()
}