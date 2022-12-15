secret_formula = 73
secret_formulaz = 37
secret_formulaez = 7

function knowledge() {
    part_1_1 = ["I"]
    part_1_2 = ["You","They","We","People","Humans","Ghosts","Gods","Animals","Planets"]
    part_1_3 = ["He","She","It","Human","Earth","Alex","Steve","The King","Apple","The Giant","Legend","Hero","Rosy","Doctor","Robber","Killer","Assassin","The God","Nima","Amin","Amir","Ramin","Mani"]
    part_1 = [part_1_1,part_1_2,part_1_3]
    
    part_2_1 = ["am","have","had"] // goes for part_1_1
    part_2_2 = ["are","have","had"] // goes for part_1_2
    part_2_3 = ["is","has","had"] // goes for part_1_3
    part_2 = [part_2_1,part_2_2,part_2_3]

    /* 

            <-------------------------------------------------------->
            <--->   part_1[0][x] + part_2[0][x] + part_3[x][y]   <--->
            <--->   part_1[1][x] + part_2[1][x] + part_3[x][y]   <--->
            <--->   part_1[2][x] + part_2[2][x] + part_3[x][y]   <--->
            <-------------------------------------------------------->

    */

    part_3_first =  ["cool","Assassin","Doctor","Killer","me","Robber","insane","amazing","dead","a beast","developer","scientist","student","an idiot","Legend","Hero","nerd","flying","eating","dying","sitting","watching","looking","searching","boring","bored","from Earth","taller","gamer","artist","stupid","SuperStar","kinda sus","weird","cringe","Captain","Bad","Real","Fake","Broke","Annoying","Flying","Playing Games","Cruel","unimaginably busy now"] // goes for am, is, are
    part_3_second = ["had enough","been killed","been stolen","coins","done your job","life","gone insane","eaten the whole ice cream","written the book","died","been lied to","been destroyed","been dreaming","seen here before","begun the challenge","to be murdered","to be nice","to eat dirt","to say hi","to answer me","to kill the ender dragon and free the end","to get 100 score in the exam","to stop it","to explode to pieces","to do the Unthinkable"] // goes for have, have, has
    part_3_third =  ["to go","the opportunity","the chance","to clean the room","enough power","lost","begun","the key","money","to play all night","to defeat everyone","to become the best","to recover","to start again","to do it","to drink orange juice with milk","to break glass","to eat expired food","to be murdured","to be bought","to be killed using the Axe","to buy poison","to buy tomatoes","to buy potatoes","to eat food","to kill the unkillable"] // goes for had, had, had
    part_3 = [part_3_first,part_3_second,part_3_third]

    parts = [part_1,part_2,part_3]
    return parts
}

function repeat(key,count) {
    store = ""
    for (let index = 0; index < count; index++)
        store += key
    return store
}

function key_parter(key) {
    return key.split("")
}

function decoder_key(key) {
    code = []
    key.forEach(element => {
        code.push(element.charCodeAt(0)*secret_formulaez)
    });
    return code
}

function avg(list) {
    count = 0
    sum = 0
    list.forEach(e => {
        sum += parseInt(e)
        count++
    });
    return parseInt(sum / count)
}

function bina(key) {
    kay = []
    current = 0
    key.forEach(element => {
        kay[current] = parseInt(element).toString(2)
    });
    return kay
}

function sumy(key) {
    current = 0
    key.forEach(a => {
        sum = 0
        a.split("").forEach(b => {
            sum += parseInt(b)
        });
        key[current] = sum
        current += 1
    });
    return key
}

function generate(key) {
    generated_string = ""
    knowings = knowledge()
    p1 = knowings[0]; p2 = knowings[1]; p3 = knowings[2]
    key = key_parter(key)
    code = decoder_key(key)
    e = parseInt(parseInt(avg(code))) * secret_formula + secret_formulaz - parseInt(avg(sumy(bina(code))))
    generated_string += p1[e%3][e % p1[e%3].length] + " "
    generated_string += p2[e%3][e % p2[e%3].length] + " "
    generated_string += p3[e % p2[e%3].length][e % p3[e % p2[e%3].length].length] + "."
    return generated_string
}