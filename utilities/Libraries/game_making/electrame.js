// Game default logic
var EFGRAVITY = -0.1;
var EFFRICTION = 0.025;
var EGRAVITY=false
var EFRICTION=false
EGamesImages = []
// key detection
KeysPressed = []
addEventListener("keydown",(e) => {
    !_findEqual(KeysPressed,e.key) ? KeysPressed.push([e.key,true]) : KeysPressed[_findIndex(KeysPressed,e.key)][1] = true;
});
addEventListener("keyup",(e) => {
    !_findEqual(KeysPressed,e.key) ? KeysPressed.push([e.key,false]) : KeysPressed[_findIndex(KeysPressed,e.key)][1] = false;
});

function _findEqual(array,key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0]==key)
            return true
    }
    return false
}
function _findIndex(array,key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0]==key)
            return index
    }
}
function _findResult(array,key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0]==key)
            return array[index][1]
    }
    return false
}

// Colors
class EColors {
    constructor (opacity) {
        this.WHITE = "rgba(255,255,255," + opacity + ")"
        this.GRAY = "rgba(100,100,100," + opacity + ")"
        this.BLACK = "rgba(0,0,0," + opacity + ")"
        this.RED = "rgba(200,0,0," + opacity + ")"
        this.DARKRED = "rgb(100,0,0," + opacity + ")"
        this.PINK = "rgba(210,0,100," + opacity + ")"
        this.PURPLE = "rgba(200,0,200," + opacity + ")"
        this.NIGHT = "rgba(100,0,200," + opacity + ")"
        this.DARKPURPLE = "rgba(100,0,100," + opacity + ")"
        this.BLUE = "rgba(0,0,200," + opacity + ")"
        this.DARKBLUE = "rgba(0,0,100," + opacity + ")"
        this.DAY = "rgba(0,100,200," + opacity + ")"
        this.LIGHTBLUE = "rgba(0,200,200," + opacity + ")"
        this.BLUEGREEN = "rgba(0,200,100," + opacity + ")"
        this.GREEN = "rgba(0,200,0," + opacity + ")"
        this.DARKGREEN = "rgba(0,100,0," + opacity + ")"
        this.YELLOWGREEN = "rgba(100,200,0," + opacity + ")"
        this.YELLOW = "rgba(200,200,0," + opacity + ")"
        this.DARKYELLOW = "rgba(100,100,0," + opacity + ")"
        this.ORANGE = "rgba(200,100,0," + opacity + ")"
    }
}

function EKeyboard(key) {return _findResult(KeysPressed,key.toLowerCase());}

class EGame {
    constructor (screen_id) {
        this.screen_id = screen_id
        EGamesImages.push([screen_id,[]])
    }
}

class ESquare {
    constructor(Scale_x,Scale_y) {
        this.w = Scale_x
        this.z = Scale_y
        this.Cid = "Square"
        this.id = "Square"
    }
}

class EImage {
    constructor(Scale_x,Scale_y,Image_Dest) {
        this.w = Scale_x
        this.z = Scale_y
        this.rad = Scale_x
        this.image = Image_Dest
        this.Cid = "Square"
        this.id = "Image"
        this.SpecialityRegisterCode = _RandomizedDigitedNumber(30)
    }
}

class ECircle {
    constructor(radius) {
        this.rad = radius
        this.Cid = "Circle"
        this.id = "Circle"
    }
}

class EObject {
    constructor (Position_x,Position_y,Shape,Color) {
        this.x = Position_x
        this.y = Position_y
        this.shape = Shape
        this.color = Color
        this.vx = 0
        this.vy = 0
    }
}

function _abs(num) {
    if (num < 0)
        return -num
    else
        return num
}

function _Centerize_Number(num1,num2) {
    if (num1 < 0)
        num1 += num2
    else if (num1 > 0)
        num1 -= num2
    if (_abs(num1) < _abs(num2))
        num1 = 0
    return num1
}

function EApplyForce(Object,Force,Limit) {
    if (Limit != false) {
        if (Object.vx+Force[0] <= Limit[0] && Object.vx+Force[0] >= Limit[2])
            Object.vx += Force[0]
        if (Object.vy+Force[1] <= Limit[1] && Object.vy+Force[1] >= Limit[3])
            Object.vy += Force[1]
    }
    else {
        Object.vx += Force[0]
        Object.vy += Force[1]
    }
    return Object
}

function EConfig(Gravity=false,Friction=true,GravityF=-EFGRAVITY,FrictionF=EFFRICTION) {
    EGRAVITY = Gravity
    EFRICTION = Friction
    EFFRICTION = FrictionF
    EFGRAVITY = -GravityF
}

function _randomize(min,max) {
    return min + Math.floor(Math.random()*(max-min))
}

function _RandomizedDigitedNumber(num) {
    let numberz = "";
    keys = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%"
    keys = keys.split('')
    limit = keys.length
    for (let index = 0; index < num; index++) {
        numberz += keys[_randomize(0,limit)]
    }
    return numberz
}

function EBoxCollision(rect1,rect2) {
    Collision = rect1.x < rect2.x + rect2.shape.w && rect1.x + rect1.shape.w > rect2.x && rect1.y < rect2.y + rect2.shape.z && rect1.shape.z + rect1.y > rect2.y
    Collisionz = [rect1.x < rect2.x + rect2.shape.w , rect1.x + rect1.shape.w > rect2.x , rect1.y < rect2.y + rect2.shape.z , rect1.shape.z + rect1.y > rect2.y]
    return [Collision,Collisionz]
}

function EBoxCircleCollision(circ1,rect2) {
    cx = circ1.x; cy = circ1.y; rx = rect2.x; ry = rect2.y; rw = rect2.shape.w; rh = rect2.shape.z; radius = circ1.shape.rad;
    testX = cx;
    testY = cy;
    if (cx < rx)         testX = rx;
    else if (cx > rx+rw) testX = rx+rw;
    if (cy < ry)         testY = ry;
    else if (cy > ry+rh) testY = ry+rh;
    distX = cx-testX;
    distY = cy-testY;
    distance = Math.sqrt( (distX*distX) + (distY*distY) );
    if (distance <= radius) {
        return true;
    }
    return false;
    // thanks to https://www.jeffreythompson.org/collision-detection/circle-rect.php 
}

function EDeleteObject(GObject) {
    if (GObject.shape.id == "Image") {
        let tempp
        for (let index = 0; index < EGamesImages.length; index++) {
            for (let indez = 0; indez < EGamesImages[index][1].length; indez++) {
                if (EGamesImages[index][1][indez] == GObject) {
                    tempp = EGamesImages[index][1][0]
                    EGamesImages[index][1][0] = EGamesImages[index][1][indez]
                    EGamesImages[index][1][indez] = tempp
                    EGamesImages[index][1] = EGamesImages[index][1].shift()
                }
            }
        }
    }
    return undefined
}

function ECircleCollision(circ1,circ2) {
    distance = Math.sqrt(parseFloat(Math.abs(circ1.x-circ2.x)**2)+parseFloat(Math.abs(circ1.y-circ2.y)**2))
    if (distance <= parseFloat(circ1.shape.rad + circ2.shape.rad))
        return true
    else
        return false
}

function EVelocityX(object) {return object.vx}
function EVelocityY(object) {return object.vy}
function EPositionX(object) {return object.x}
function EPositionY(object) {return object.y}
function EScaleX(object) {return object.shape.w}
function EScaleY(object) {return object.shape.z}
function ERadius(object) {return object.shape.rad}
function EType(object) {return object.shape.id}

function ESetVelocityX(object,value) {return object.vx=value}
function ESetVelocityY(object,value) {return object.vy=value}
function ESetPositionX(object,value) {return object.x=value}
function ESetPositionY(object,value) {return object.y=value}
function ESetScaleX(object,value) {return object.shape.w=value}
function ESetScaleY(object,value) {return object.shape.z=value}
function ESetRadius(object,value) {return object.shape.rad=value}

function EApplyCollision(object1,object2,Bounce_Force) { // Bounce force is basically the force that will be applied to the object after hitting the thing its different in different materials
    if (object1.shape.Cid == "Square" && object2.shape.Cid == "Square") {
        if (EBoxCollision(object1,object2)[0]) {
            let object1Top_object2Bottom = Math.abs(object1.y - (object2.y + object2.shape.z));
            let object1Right_object2Left = Math.abs((object1.x + object1.shape.w) - object2.x);
            let object1Left_object2Right = Math.abs(object1.x - (object2.x + object2.shape.w));
            let object1Bottom_object2Top = Math.abs((object1.y + object1.shape.z) - object2.y);
        
            if ((object1.y <= object2.y + object2.shape.z && object1.y + object1.shape.z > object2.y + object2.shape.z) && (object1Top_object2Bottom < object1Right_object2Left && object1Top_object2Bottom < object1Left_object2Right)) {
                object1.y = object2.y + object2.shape.z;
                object1.vy = Bounce_Force;
            }
            if ((object1.y + object1.shape.z >= object2.y && object1.y < object2.y) && (object1Bottom_object2Top < object1Right_object2Left && object1Bottom_object2Top < object1Left_object2Right)) {
                object1.y = object2.y - object1.shape.z; 
                object1.vy = -Bounce_Force;
            }
            if ((object1.x + object1.shape.w >= object2.x && object1.x < object2.x) && (object1Right_object2Left < object1Top_object2Bottom && object1Right_object2Left < object1Bottom_object2Top)) {
                object1.x = object2.x - object1.shape.w;
                object1.vx = Bounce_Force; 
            }
            if ((object1.x <= object2.x + object2.shape.w && object1.x + object1.shape.w > object2.x + object2.shape.w) && (object1Left_object2Right < object1Top_object2Bottom && object1Left_object2Right < object1Bottom_object2Top)) {
                object1.x = object2.x + object2.shape.w;
                object1.vx = -Bounce_Force; 
            }
        }
    }
    else if (object1.shape.Cid == "Circle" && object2.shape.Cid == "Square") {
        if (EBoxCircleCollision(object1,object2)) {
            let CircleLeft = object1.x-object1.shape.rad
            let CircleRight = object1.x+object1.shape.rad
            let CircleTop = object1.y-object1.shape.rad
            let CircleBottom = object1.y+object1.shape.rad
            let SquareLeft = object2.x
            let SquareRight = object2.x+object2.shape.w
            let SquareTop = object2.y
            let SquareBottom = object2.y+object2.shape.z
            if ((CircleLeft <= SquareRight && object1.x >= object2.x) && !(object2.x+1 < object1.x && object1.x < object2.x+object2.shape.w-1)) {
                object1.vx = -object1.vx*Bounce_Force
                object1.vy = object1.vy*Bounce_Force
            }
            else if ((CircleRight >= SquareLeft && object1.x <= object2.x) && !(object2.x+1 < object1.x && object1.x < object2.x+object2.shape.w-1)) {
                object1.vx = -object1.vx*Bounce_Force
                object1.vy = object1.vy*Bounce_Force
            }
            if ((CircleTop <= SquareBottom && object1.y >= object2.y) && (object2.x+1 < object1.x && object1.x < object2.x+object2.shape.w-1)) {
                object1.vx = object1.vx*Bounce_Force
                object1.vy = -object1.vy*Bounce_Force
            }
            else if ((CircleBottom >= SquareTop && object1.y <= object2.y) && (object2.x+1 < object1.x && object1.x < object2.x+object2.shape.w-1)) {
                object1.vx = object1.vx*Bounce_Force
                object1.vy = -object1.vy*Bounce_Force
            }
        }
    }
    else if (object1.shape.Cid == "Circle" && object2.shape.Cid == "Circle")  {
        if (ECircleCollision(object1,object2)) {
            object1.vx = -object1.vx*Bounce_Force
            object1.vy = -object1.vy*Bounce_Force
        }
    }
    else if (object1.shape.Cid == "Square" && object2.shape.Cid == "Circle") {
        console.log("Box Circle Collider")
    }
    return object1
}

function EApplyMotion(Object) {
    Object.x += Object.vx
    Object.y += Object.vy
    return Object
}

function EInit() {
    let A = document.createElement("div")
    A.id = "GameAssets"
    document.body.append(A)
}

function EApplyPhysicsTo(Object) {
    if (EGRAVITY)
    Object.vy -= EFGRAVITY
    if (EFRICTION) {
        Object.vx = _Centerize_Number(Object.vx,EFFRICTION)
        Object.vy = _Centerize_Number(Object.vy,EFFRICTION)
    }
    return Object
}

Current_Added_Images = 0

function ECreateGame(id,width,height) {
    let Game = document.createElement("canvas")
    Game.id = id
    Game.width = width
    Game.height = height
    document.body.append(Game)
}

function ERender(Game,Objectz) {
    let mrflag = false
    var game = document.getElementById(Game.screen_id).getContext("2d");
    game.fillStyle = Objectz.color
    if (Objectz.shape.id == "Square")
        game.fillRect(Objectz.x,Objectz.y,Objectz.shape.w,Objectz.shape.z);
        if (Objectz.shape.id == "Circle") {
            game.beginPath();
            game.arc(Objectz.x, Objectz.y, Objectz.shape.rad, 0, 2 * Math.PI);
            game.fill();
    }
    if (Objectz.shape.id == "Image") {
            Image = document.createElement("img")
            Image.setAttribute("src",Objectz.shape.image)
            Image.setAttribute("class","EImage")
            Image.id=Objectz.shape.SpecialityRegisterCode
            game.drawImage(Image,Objectz.x,Objectz.y,Objectz.shape.w,Objectz.shape.z)
    }
}


function EClear(Game) {
    return document.getElementById(Game.screen_id).getContext("2d").reset()
}