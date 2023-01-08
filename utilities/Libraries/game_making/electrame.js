// Game default logic
const EFGRAVITY = -0.1;
const EFFRICTION = 0.025;
var EGRAVITY=false
var EFRICTION=false


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

class EGame {
    constructor (screen_id) {
        this.screen_id = screen_id
    }
}

class ESquare {
    constructor(Scale_x,Scale_y) {
        this.w = Scale_x
        this.z = Scale_y
        this.id = "Square"
    }
}

class ECircle {
    constructor(radius) {
        this.rad = radius
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

function Centerize_Number(num1,num2) {
    if (num1 < 0)
        num1 += num2
    else if (num1 > 0)
        num1 -= num2
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

function EConfig(Gravity=false,Friction=true) {
    EGRAVITY = Gravity
    EFRICTION = Friction
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

function ECircleCollision(circ1,circ2) {
    distance = Math.sqrt(parseFloat(Math.abs(circ1.x-circ2.x)**2)+parseFloat(Math.abs(circ1.y-circ2.y)**2))
    if (distance <= parseFloat(circ1.shape.rad + circ2.shape.rad))
        return true
    else
        return false
}

function EApplyMotion(Object) {
    Object.x += Object.vx
    Object.y += Object.vy
    return Object
}

function EApplyPhysicsTo(Object) {
    if (EGRAVITY)
        Object.vy -= EFGRAVITY
    if (EFRICTION) {
        Object.vx = Centerize_Number(Object.vx,EFFRICTION)
        Object.vy = Centerize_Number(Object.vy,EFFRICTION)
    }
    return Object
}

function ERender(Game,Objectz) {
    var game = document.getElementById(Game.screen_id).getContext("2d");
    game.fillStyle = Objectz.color
    if (Objectz.shape.id == "Square")
        game.fillRect(Objectz.x,Objectz.y,Objectz.shape.w,Objectz.shape.z);
    if (Objectz.shape.id == "Circle") {
        game.beginPath();
        game.arc(Objectz.x, Objectz.y, Objectz.shape.rad, 0, 2 * Math.PI);
        game.fill();
    }
}

function EClear(Game) {
    return document.getElementById(Game.screen_id).getContext("2d").reset()
}