// Game default logic
const EFGRAVITY = 0.05;
const EFFRICTION = 0.025;

// Colors
class EColors {
    constructor () {
        this.RED = "rgb(200,0,0)"
        this.DARKRED = "rgb(100,0,0)"
        this.PINK = "rgb(210,0,100)"
        this.PURPLE = "rgb(200,0,200)"
        this.NIGHT = "rgb(100,0,200)"
        this.DARKPURPLE = "rgb(100,0,100)"
        this.BLUE = "rgb(0,0,200)"
        this.DARKBLUE = "rgb(0,0,100)"
        this.DAY = "rgb(0,100,200)"
        this.LIGHTBLUE = "rgb(0,200,200)"
        this.BlueGreen = "rgb(0,200,100)"
        this.GREEN = "rgb(0,200,0)"
        this.DARKGREEN = "rgb(0,100,0)"
        this.YELLOWGREEN = "rgb(100,200,0)"
        this.YELLOW = "rgb(200,200,0)"
        this.DARKYELLOW = "rgb(100,100,0)"
        this.ORANGE = "rgb(200,100,0)"
    }
}

class EGame {
    constructor (screen_id) {
        this.screen_id = screen_id
    }
}

class EObject {
    constructor (Position_x,Position_y,Scale_x,Scale_y,Color) {
        this.x = Position_x
        this.y = Position_y
        this.w = Scale_x
        this.z = Scale_y
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
    if (Object.vx+Force[0] <= Limit[0] && Object.vx+Force[0] >= Limit[2])
        Object.vx += Force[0]
    if (Object.vy+Force[1] <= Limit[1] && Object.vy+Force[1] >= Limit[3])
        Object.vy += Force[1]
    return Object
}

function ECollision(rect1,rect2) {
    Collision = rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.z && rect1.z + rect1.y > rect2.y
    return Collision
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

function ERender(Game,Object) {
    var game = document.getElementById(Game.screen_id).getContext("2d");
    game.fillStyle = Object.color
    game.fillRect(Object.x,Object.y,Object.w,Object.z);
}

function EClear(Game) {
    return document.getElementById(Game.screen_id).getContext("2d").reset()
}