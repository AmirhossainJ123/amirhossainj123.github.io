function randomizer(min,max) {return min + Math.floor(Math.random()*(max-min))}
function show(array,seperator) {str=""; for (x=0;x<array.length;x++) str+=seperator+array[x]; return str.replace(seperator,"");}
function ElectronResult(a,b) {if (a>b) return a-b; else return 0;} // a = shell number, b = current limit to be applied
function ShellResult(a,b) {if (a>=b) return b; else return a;} // a = shell number, b = current limit to be applied
function calculate(a) { // a = atomic number
    Confirmation = true
    if (a >= 1000000000) {
        Confirmation = confirm("This might lag your computer\nDo you want to continue?")
    }
    if (Confirmation) {
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
}
dnldamount = localStorage.getItem("dndld")
function download() {
    dnldamount++;
    localStorage.setItem("dndld",dnldamount)
    var link = document.createElement('a');
    let number = document.getElementById('atomic_number').value
    link.download = 'Atom ' + number + "_" + dnldamount + '.png';
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
}
PublicKey = false
function test(a=0,b) {
    setTimeout((e)=>{
        PublicKey = false
        draw(calculate(a));
        a++;
        if (a < b)
            test(a,b);
        else
            PublicKey = true
    },parseInt(document.getElementById("fps").value));
}
function record_check(mediaRecorder,recordedChunks,stream,canvas) {
    setTimeout((e)=>{
        if (PublicKey) {
            mediaRecorder.stop();
            setTimeout(() => {
                const blob = new Blob(recordedChunks, {
                    type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "recording.webm";
                a.click();
                URL.revokeObjectURL(url);
            },0);
            document.getElementById("recorder").hidden = false;
            document.getElementById("animator").hidden = false;
            document.getElementById("drawer").hidden = false;
            document.getElementById("fps").hidden = false;
        }
        else
            record_check(mediaRecorder,recordedChunks,stream,canvas);
    },10);
}
function record() {
    const canvas = document.getElementById("canvas");
    document.getElementById("recorder").hidden = true;
    document.getElementById("animator").hidden = true;
    document.getElementById("drawer").hidden = true;
    document.getElementById("fps").hidden = true;
    let mediaRecorder;
    let recordedChunks;
    const stream = canvas.captureStream(25);
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        ignoreMutedMedia: true
    });
    recordedChunks = [];
    mediaRecorder.ondataavailable = e => {
        if(e.data.size > 0){
        recordedChunks.push(e.data);
        }
    };
    mediaRecorder.start();
    animate = test(0,document.getElementById('atomic_number').value)
    record_check(mediaRecorder,recordedChunks,stream,canvas)
}
function draw(shells) {
    Confirmation = true
    if (shells.length >= 20) {
        Confirmation = confirm("This might lag your computer\nDo you want to continue?")
    }
    if (Confirmation) {
        margin=80;
        scale = (shells.length*2+1)*margin;
        const canvas = document.getElementById("canvas");
        canvas.width = scale; canvas.height = scale;
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.reset()
            ctx.fillStyle = "rgb(255,255,255)"
            ctx.fillRect(0,0,scale,scale)
            ctx.beginPath();
            ctx.arc(scale/2, scale/2, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "rgb(125,50,0)"
            ctx.fill();
            for (let index = 1; index <= shells.length; index++){
                ctx.beginPath();
                ctx.arc(scale/2, scale/2, index*margin, 0, 2 * Math.PI);
                ctx.lineWidth = 4;
                ctx.strokeStyle = "rgb(0,0,0)"
                ctx.stroke();
                let radius = margin*index;
                let amountOfDots = shells[index-1];
                let angle = 2 * Math.PI / amountOfDots;
                for (let i = 0; i < amountOfDots; i++) {
                    let x = scale/2 + radius * Math.cos(i * angle);
                    let y = scale/2 + radius * Math.sin(i * angle);
                    ctx.beginPath();
                    ctx.arc(x, y, 12, 0, 2 * Math.PI);
                    ctx.strokeStyle = "rgb(0,0,100)"
                    ctx.fillStyle = "rgb(0,0,255)"
                    ctx.lineWidth = 2
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(0,0,100)"
                    ctx.moveTo(x-5,y)
                    ctx.lineWidth = 3
                    ctx.lineTo(x+5,y)
                    ctx.stroke();
                }
            }
        }
    }
}