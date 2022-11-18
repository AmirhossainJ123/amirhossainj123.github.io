czzz = 255
posy = 380
start = false
speedy = 0
bluwish = 0
captured = 0
gravity = 0.5
friction = 0.25
enemy_posx = [0,0,0]
enemy_posy = [0,0,0]
food_posx = [0]
food_posy = [0]
score = 0
enemy_speed = 5
food_speed = 5
player_speed = 5
function doAll() {
    document.getElementById("start_button").hidden = true
    document.getElementById("option").hidden = false
    for (let index = 0; index < enemy_posx.length; index++) {
        random_enemy_pos(index)
    }
    for (let index = 0; index < food_posx.length; index++) {
        random_food_pos(index)
    }
}
function sleeptick() {
    setTimeout(() => {
        if (start) {
            main_loop()
            score_shower()
            doAll()
            gravity_and_friction_and_speed()
        }
        else
            sleeptick()
    }, 100);
}
function builds(posx) {
    const canvas = document.getElementById("game");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,100,0)"
        ctx.fillRect(0,400,700,100);
        ctx.fillStyle = `rgb(${czzz},${czzz},${czzz})`
        ctx.fillRect(posx,posy,20,20);
        for (let index = 0; index < food_posx.length; index++) {
            ctx.fillStyle = "rgb(0,0,200)"
            ctx.fillRect(food_posx[index],food_posy[index],20,20);
        }
        for (let index = 0; index < enemy_posx.length; index++) {
            ctx.fillStyle = "rgb(200,0,0)"
            ctx.fillRect(enemy_posx[index],enemy_posy[index],50,50);
        }
    }
}
function start_menu() {
    const canvas = document.getElementById("game");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(0,0,700,500);
    }
}
function head_down() {
    speedy = player_speed+15
}
function jump() {
    speedy = -1*(player_speed+5)
}
function rule_fly() {
    return true;
}
posx = 0
speed = 0
key_left = false
key_right = false
key_up = false
key_down = false
function randomizer(min,max) {
    return min + Math.floor(Math.random()*(max-min))
}
function score_shower() {
    setTimeout(() => {
        document.getElementById("scorem").textContent = "Score: " + score
        document.getElementById("capturedz").textContent = "Cursed: " + captured
        document.getElementById("bluwishz").textContent = "Bluwish: " + bluwish
        if (czzz >= 255)
            document.getElementById("warres").textContent = "To Victory: " + parseInt(parseInt(500)-parseInt(czzz))
        else if (czzz < 255)
            document.getElementById("warres").textContent = "To Defeat: " + czzz
        score_shower()
    }, 100);
}
function add_more() {
    enemy_posx.push("0")
    enemy_posy.push("0")
    for (let index = 0; index < enemy_posx.length; index++) {
        random_enemy_pos(index)
    }
    score = 0
}
function remove_enemy() {
    enemy_posxx = []
    enemy_posyy = []
    for (let index = 0; index < enemy_posx.length-1; index++) {
        enemy_posxx[index] = enemy_posx[index]
        enemy_posyy[index] = enemy_posy[index]
    }
    enemy_posx = enemy_posxx
    enemy_posy = enemy_posyy
    for (let index = 0; index < enemy_posx.length; index++) {
        random_enemy_pos(index)
    }
    score = 0
}
function remove_food() {
    food_posxx = []
    food_posyy = []
    for (let index = 0; index < food_posx.length-1; index++) {
        food_posxx[index] = food_posx[index]
        food_posyy[index] = food_posy[index]
    }
    food_posx = food_posxx
    food_posy = food_posyy
    for (let index = 0; index < food_posx.length; index++) {
        random_food_pos(index)
    }
    score = 0
}
function more_food() {
    food_posx.push("0")
    food_posy.push("0")
    for (let index = 0; index < food_posx.length; index++) {
        random_food_pos(index)
    }
    score = 0
}
function main() {
    start_menu()
    sleeptick()
    addEventListener("keyup",(e) => {
        switch (e.keyCode) {
            case 37: case 65: key_left = false; break;
            case 38: case 87: key_up = false; break;
            case 39: case 68: key_right = false; break;
            case 40: case 83: key_down = false; break;
        }
    });
    addEventListener("keydown",(e) => {
        switch (e.keyCode) {
            case 37: case 65: key_left = true; break;
            case 38: case 87: key_up = true; break;
            case 39: case 68: key_right = true; break;
            case 40: case 83: key_down = true; break;
        }
    });
}
function random_enemy_pos(index) {
    enemy_posx[index] = randomizer(700,750)
    enemy_posy[index] = randomizer(0,350)
    score += 1
}
function random_food_pos(index) {
    food_posx[index] = randomizer(700,750)
    food_posy[index] = randomizer(0,350)
    score -= 1
}
hidden_checker = true
function toggle_menu() {
    hidden_checker = !hidden_checker
    document.getElementById("fus").hidden = hidden_checker
    document.getElementById("sus").hidden = hidden_checker
    document.getElementById("susx").hidden = hidden_checker
    document.getElementById("fusx").hidden = hidden_checker
    document.getElementById("susz").hidden = hidden_checker
    document.getElementById("suszz").hidden = hidden_checker
    document.getElementById("suszzz").hidden = hidden_checker
    document.getElementById("suszzzz").hidden = hidden_checker
    document.getElementById("suszzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzz").hidden = hidden_checker
}
function gravity_and_friction_and_speed() {
    setTimeout(() => {
        for (let index = 0; index < enemy_posx.length; index++) {
            enemy_posx[index] -= enemy_speed
            if (enemy_posx[index] < 0)
                random_enemy_pos(index)
        }
        for (let index = 0; index < food_posx.length; index++) {
            food_posx[index] -= food_speed
            if (food_posx[index] < 0)
                random_food_pos(index)
        }
        speedy += gravity
        posx += speed
        posy += speedy
        if (speed > 0)
            speed-=friction
        if (speed < 0)
            speed+=friction
        gravity_and_friction_and_speed()
    }, 10);
}
function apply_buttons() {
    if (key_down)
        head_down()
    if (key_left)
        speed = -player_speed
    if (key_right)
        speed = player_speed
    if (key_up)
        if (rule_fly)
            jump()
}
function colirule() {
    if (posx < 0)
        posx = 0
    if (posx > 680)
        posx = 680
    if (posy < 0)
        posy = 0
    if (posy > 380)
        posy = 380
    for (let index = 0; index < enemy_posx.length; index++) {
        dx = Math.abs((posx+10)-(enemy_posx[index]+25))
        dy = Math.abs((posy+10)-(enemy_posy[index]+25))
        if (dx < 35 && dy < 35) {
            czzz -= 1
            posx = 0
            posy = 380
            random_enemy_pos(index)
            score -= 1+(enemy_posx.length/2)
            captured += 1
        }
    }
    for (let index = 0; index < food_posx.length; index++) {
        dx = Math.abs((posx+10)-(food_posx[index]+10))
        dy = Math.abs((posy+10)-(food_posy[index]+10))
        if (dx < 20 && dy < 20) {
            czzz += 1
            random_food_pos(index)
            score += 1
            bluwish += 1
        }
    }
}
function main_loop() {
    setTimeout(() => {
        apply_buttons()
        colirule()
        const canvas = document.getElementById("game").getContext("2d").reset();
        builds(posx)
        if (czzz <= 0) {
            document.getElementById("game").remove()
            document.getElementById("lforu").hidden = false
            score = "Defeated"
        }
        else if (czzz >= 500) {
            document.getElementById("game").remove()
            document.getElementById("wforu").hidden = false
            score = "Victory"
        }
        else
            main_loop()
    }, 2);
}