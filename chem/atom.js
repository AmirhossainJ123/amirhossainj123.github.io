function show(array,seperator) {str=""; for (x=0;x<array.length;x++) str+=seperator+array[x]; return str.replace(seperator,"");}
function ElectronResult(a,b) {if (a>b) return a-b; else return 0;} // a = shell number, b = current limit to be applied
function ShellResult(a,b) {if (a>=b) return b; else return a;} // a = shell number, b = current limit to be applied
function calculate(a) { // a = atomic number
    n = 0;
    b = 0;
    a = parseInt(a);
    shell_array = [0];
    elec_array = [2];
    while (a>0) {
        if (b==2) {
            b = 0;
            elec_array.unshift(elec_array[0]+4);
            n--;
        }
        for (let index = 0; index < elec_array.length; index++) {
            if (shell_array[index+n] == NaN || shell_array[index+n] == undefined || shell_array[index+n] == null)
                shell_array[index+n] = 0
            shell_array[index+n] += ShellResult(a,elec_array[index]);
            a = ElectronResult(a,elec_array[index]);
        }
        n++;
        b++;
    }
    if (shell_array[shell_array.length-1] == 0)
        shell_array.pop(shell_array.length-1)
    return shell_array
}
function draw(shells) {
    margin=80;
    scale = (shells.length*2+1)*margin;
    const canvas = document.getElementById("canvas");
    canvas.width = scale; canvas.height = scale;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.reset()
        ctx.beginPath();
        ctx.arc(scale/2, scale/2, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "rgb(200,0,0)"
        ctx.fill();
        for (let index = 1; index <= shells.length; index++){
            ctx.beginPath();
            ctx.arc(scale/2, scale/2, index*margin, 0, 2 * Math.PI);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.stroke();
            let radius = margin*index;
            let amountOfDots = shells[index-1];
            let angle = 2 * Math.PI / amountOfDots;
            for (let i = 0; i < amountOfDots; i++) {
                let x = scale/2 + radius * Math.cos(i * angle);
                let y = scale/2 + radius * Math.sin(i * angle);
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.strokeStyle = "rgb(0,0,100)"
                ctx.fillStyle = "rgb(0,0,255)"
                ctx.lineWidth = 2
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}