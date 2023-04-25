toggle = true;
function doci(id) {return document.getElementById(id);}
function darkmodetoggle() {
    let Nodes = document.body.querySelectorAll("*");
    for (let index = 0; index < Nodes.length; index++) {
        try {
        const element = Nodes.item(index);
        if (element.style.backgroundColor === "white")
            element.style.backgroundColor = "black"
        else if (element.style.backgroundColor === "black")
            element.style.backgroundColor = "white"
        else if (element.style.backgroundColor.startsWith("rgba("))
            element.style.backgroundColor = "rgba" + arrtostr(opcolor(element.style.backgroundColor.replaceAll("rgba(","").replaceAll(")","").split(","))) + ")"
        else if (element.style.backgroundColor.startsWith("rgb("))
            element.style.backgroundColor = "rgb" + arrtostr(opcolor(element.style.backgroundColor.replaceAll("rgb(","").replaceAll(")","").split(","))) + ")"
        
        if (element.style.color === "white")
            element.style.color = "black"
        else if (element.style.color === "black")
            element.style.color = "white"
        else if (element.style.color.startsWith("rgba("))
            element.style.color = "rgba" + arrtostr(opcolor(element.style.color.replaceAll("rgba(","").replaceAll(")","").split(","))) + ")"
        else if (element.style.color.startsWith("rgb("))
            element.style.color = "rgb" + arrtostr(opcolor(element.style.color.replaceAll("rgb(","").replaceAll(")","").split(","))) + ")"
        } catch(err) {
            console.log(err);
        }
    }
}
function opcolor(array) {array[0] = parseInt(255-array[0]) + ","; array[1] = parseInt(255-array[1]) + ","; array[2] = parseInt(255-array[2]); return array}
function arrtostr(arr) {let finalstring = ""; arr.forEach((e) => {finalstring+=e;}); return arr;}
function clickedonimage() {
    if (toggle)
        doci("logo").className = "bluemode redmode"
    else
        doci("logo").className = "bluemode"
    toggle = !toggle;
    darkmodetoggle()
}