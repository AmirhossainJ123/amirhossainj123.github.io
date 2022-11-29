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
wall_posx = [0,0,0]
wall_posy = [0,0,0]
magnet_posx = [0]
magnet_posy = [0]
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
    for (let index = 0; index < wall_posx.length; index++) {
        random_wall_pos(index)
    }
    for (let index = 0; index < food_posx.length; index++) {
        random_food_pos(index)
    }
    for (let index = 0; index < magnet_posx.length; index++) {
        random_magnet_pos(index)
    }
}
function askey() {
    alert("Welcome to Jumpo Bumpi game")
    alert("So basically your goal here is to dodge redies and get bluies as much as you can")
    alert("If you get hit by a redy you will get a minus score and your soul will get closer to ultimate darkness")
    alert("but if you get hit by a bluey your soul will get closer to ultimate whiteness")
    alert("once you reached the ultimate whiteness you win, and once you reached ultimate darkness you loose")
    alert("There are also 2 more things a tall rectangle which is a wall you have to dodge or else it can be annoying")
    alert("and a small cube which is a magnet you can eat it by hitting it and you will pull the near bluies to yourself")
    alert("You can move with either those buttons or WASD, WARNING: not made for FireFox")
    confirm_it = confirm("Are you ready?")
    if (confirm_it)
        return true
    else
        return false
}
function sleeptick() {
    setTimeout(() => {
        if (start) {
            if (askey()){
                main_loop()
                score_shower()
                doAll()
                gravity_and_friction_and_speed()
            }
            else {
                sleeptick()
                start =false
            }
        }
        else
            sleeptick()
    }, 100);
}
function builds() {
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
        for (let index = 0; index < wall_posx.length; index++) {
            ctx.fillStyle = "rgb(100,25,10)"
            ctx.fillRect(wall_posx[index],wall_posy[index],10,120);
        }
        for (let index = 0; index < enemy_posx.length; index++) {
            ctx.fillStyle = "rgb(200,0,0)"
            ctx.fillRect(enemy_posx[index],enemy_posy[index],50,50);
        }
        for (let index = 0; index < magnet_posx.length; index++) {
            ctx.fillStyle = "rgb(0,200,0)"
            ctx.fillRect(magnet_posx[index],magnet_posy[index],10,10);
        }
    }
}
function start_menu() {
    const canvas = document.getElementById("game");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(0,0,700,500);
        ctx.strokeStyle = "rgb(200,200,200)"
        ctx.beginPath();
        ctx.moveTo(120, 30);
        ctx.lineTo(30, 120);
        ctx.lineWidth = 4
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(600, 470);
        ctx.lineTo(670, 400);
        ctx.lineWidth = 3
        ctx.stroke();
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
toggle_magnet = false
function randomizer(min,max) {
    return min + Math.floor(Math.random()*(max-min))
}
function score_shower() {
    setTimeout(() => {
        document.getElementById("scorem").textContent = "Score: " + score
        document.getElementById("capturedz").textContent = "Cursed: " + captured
        document.getElementById("bluwishz").textContent = "Bluwish: " + bluwish
        document.getElementById("magnet").textContent = "Magnet: " + toggle_magnet
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
function remove_wall() {
    wall_posxx = []
    wall_posyy = []
    for (let index = 0; index < wall_posx.length-1; index++) {
        wall_posxx[index] = wall_posx[index]
        wall_posyy[index] = wall_posy[index]
    }
    wall_posx = wall_posxx
    wall_posy = wall_posyy
    for (let index = 0; index < wall_posx.length; index++) {
        random_wall_pos(index)
    }
}
function more_wall() {
    wall_posx.push("0")
    wall_posy.push("0")
    for (let index = 0; index < wall_posx.length; index++) {
        random_wall_pos(index)
    }
}
function remove_mag() {
    magnet_posxx = []
    magnet_posyy = []
    for (let index = 0; index < magnet_posx.length-1; index++) {
        magnet_posxx[index] = magnet_posx[index]
        magnet_posyy[index] = magnet_posy[index]
    }
    magnet_posx = magnet_posxx
    magnet_posy = magnet_posyy
    for (let index = 0; index < magnet_posx.length; index++) {
        random_magnet_pos(index)
    }
}
function more_mag() {
    magnet_posx.push("0")
    magnet_posy.push("0")
    for (let index = 0; index < magnet_posx.length; index++) {
        random_magnet_pos(index)
    }
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
function random_wall_pos(index) {
    wall_posx[index] = randomizer(700,750)
    wall_posy[index] = randomizer(0,350)
}
function random_magnet_pos(index) {
    magnet_posx[index] = randomizer(700,750)
    magnet_posy[index] = randomizer(0,350)
}
function directioner(x,y,w,z,addance) {
    code = [x,y,true]
    dx = Math.abs(x-w)
    dy = Math.abs(y-z)
    if (dx < addance && dy < addance)
        code[2] = false
    if (dx > addance) {
        if (x < w)
            code[0] = x+addance
        else if (x > w)
            code[0] = x-addance
    }
    dx = Math.abs(x-w)
    dy = Math.abs(y-z)
    if (dy > addance) {
        if (y < z)
            code[1] = y+addance
        else if (y > z)
            code[1] = y-addance
    }
    return code
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
    document.getElementById("suszzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzzzzzz").hidden = hidden_checker
    document.getElementById("suszzzzzzzzzzzzzzzzzz").hidden = hidden_checker
}
function check(chek) {
    if (chek)
        return true
    else
        return false
}
function slow_while(delay,loop,extra_hacks_no_fbi_plz,index,bd) {
    setTimeout(() => {
        dy = Math.abs((posy+10)-(food_posy[index]+10))
        dx = Math.abs((posx+10)-(food_posx[index]+10))
        basically_distance = Math.sqrt(dx**2 + dy**2)
        bd = basically_distance
        if (check((bd <= 100 && toggle_magnet && directioner(parseInt(food_posx[index]),parseInt(food_posy[index]),parseInt(posx),parseInt(posy),parseInt(food_speed/5))[2]))) {
            loop()
            slow_while(delay,loop,extra_hacks_no_fbi_plz,index,bd)
        }
        else {
            extra_hacks_no_fbi_plz()
        }
    }, delay);
}
magnet_speed = 6
wall_speed = 3
function gravity_and_friction_and_speed() {
    setTimeout(() => {
        for (let index = 0; index < enemy_posx.length; index++) {
            enemy_posx[index] -= enemy_speed
            if (enemy_posx[index] < 0)
                random_enemy_pos(index)
        }
        for (let index = 0; index < wall_posx.length; index++) {
            wall_posx[index] -= wall_speed
            if (wall_posx[index] < -500)
                random_wall_pos(index)
        }
        for (let index = 0; index < food_posx.length; index++) {
            dy = Math.abs((posy+10)-(food_posy[index]+10))
            dx = Math.abs((posx+10)-(food_posx[index]+10))
            basically_distance = Math.sqrt(dx**2 + dy**2)
            bd = basically_distance
            code = function slow_while_code(stupid) {
                dy = Math.abs((posy+10)-(food_posy[index]+10))
                dx = Math.abs((posx+10)-(food_posx[index]+10))
                stupid = directioner(parseInt(food_posx[index]),parseInt(food_posy[index]),parseInt(posx),parseInt(posy),parseInt(food_speed/5))
                food_posx[index] = stupid[0]
                food_posy[index] = stupid[1]
            }
            extra_hacks_no_fbi_plz = function moove_baby() {food_posx[index] -= food_speed}
            slow_while(10,code,extra_hacks_no_fbi_plz,index,bd)
            if (food_posx[index] < 0)
                random_food_pos(index)
        }
        for (let index = 0; index < magnet_posx.length; index++) {
            magnet_posx[index] -= magnet_speed
            if (magnet_posx[index] < -1000)
                random_magnet_pos(index)
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
function applycollision(x,y,ox,ow,oy,oz) {
    hated = [false,false,false,false] // left x, right x, top y, down y
    if (x < ox)
        hated[0] = true
    else if (x > ow)
        hated[1] = true
    if (y < oy)
        hated[2] = true
    else if (y > oz)
        hated[3] = true
    return hated
}
function applycolision(x,y,w,z,ox,ow,oy,oz) {
    hated = [false,false,false,false] // left x, right x, top y, down y
    if (((x >= ox && x <= ow) && (y >= oy && y <= oz)) || ((w >= ox && w <= ow) && (z >= oy && z <= oz))) {
    if (x < ox || w < ox)
        hated[0] = true
    if (x > ow || w > ow)
        hated[1] = true
    if (y < oy || z < oy)
        hated[2] = true
    if (y > oz || z > oz)
        hated[3] = true
    }
    return hated
}
function colirule() {
    border_collision = applycollision(posx,posy,0,680,0,380)
    if (border_collision[0] || border_collision[1] || border_collision[2] || border_collision[3]) {
        if (border_collision[0])
            posx = 0
        if (border_collision[1])
            posx = 680
        if (border_collision[2])
            posy = 0
        if (border_collision[3])
            posy = 380
    }
    for (let index = 0; index < wall_posx.length; index++) {
        wally_collision = applycolision(posx,posy,posx+20,posy+20,wall_posx[index],parseInt(wall_posx[index]+10),wall_posy[index],parseInt(wall_posy[index]+120))
        if (wally_collision[0] || wally_collision[1] || wally_collision[2] || wally_collision[3]) {
            if (wally_collision[0])
                posx -= 13
            if (wally_collision[1])
                posx += 13
            if (wally_collision[2])
                posy -= 13
            if (wally_collision[3])
                posy += 13
            speed = 0
            speedy = gravity
        }
    }
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
    for (let index = 0; index < magnet_posx.length; index++) {
        dx = Math.abs((posx+10)-(magnet_posx[index]+5))
        dy = Math.abs((posy+10)-(magnet_posy[index]+5))
        if (dx < 10 && dy < 10) {
            czzz += 1
            random_magnet_pos(index)
            score += 1
            toggle_magnet = true
            reset_magnet()
        }
    }
}
function reset_magnet() {
    setTimeout(() => {
        toggle_magnet = false
    }, 5000);
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