// Made by the gigantic idiot!
// Author: AmirhossainJ123, Visual Studio Code
function xor(a, b){return (a === b ? 0 : 1);}
function and(a, b){return a == 1 && b == 1 ? 1 : 0;}
function or(a, b){return (a || b);}

function add(a,b,large_number_neededa=a.toString(),large_number_neededb=b.toString()) {
    sum = []
    az =large_number_neededa
    bz =large_number_neededb
    if (a > b)
        biggest = az.length+1
    else
        biggest = bz.length+1
    lean = az.length
    lebn = bz.length
    for (let index = 0; index < biggest-lean; index++) {
        az = "0" + az
    }
    for (let index = 0; index < biggest-lebn; index++) {
        bz = "0" + bz
    }
    for (let index = 0; index < biggest; index++) {
        sum.push("0")
    }
    for (let index = 1; index < biggest; index++) {
        zum = (parseInt(az[index]) + parseInt(bz[index])).toString()
        sum[index] = zum
    }
    for (let indez = 1; indez < sum.length; indez++) {
        index = sum.length-indez
        if (sum[index] >= 10) {
            sum[index] -= 10
            sum[index-1] = (parseInt(sum[index-1])+1).toString()
        }
    }
    reached = false
    for (let index = 0; index < sum.length; index++) {
        if (sum[index] == "0")
            sum[index] = ""
        else
            break
    }
    final_answer = ""
    sum.forEach(element => {
        final_answer += element
    });
    return final_answer
}
function divide(a,b) {
    if (b == 0 && a == 0)
        return "Undefined answer, there are infinite amount of answers for this question, it can be any number!"
    if (b == 0)
        return "Undefined answer, you cannot divide any number by 0, cause multiplication of 0 cannot increase!"
    if (a == 0)
        return 0
    if (a == b)
        return 1
    if (a < b)
        return divideB(a,b)
    if (a > b)
        return divideS(a,b)
}
function divideB(a,b) { //
    final_answer = "";
    final_answer_pluser = 0;
    num = a;
    min = b;
    runtime = 0
    //zum = 1
    done = false
    first = true
    runtime_limit = 100000
    while (runtime < runtime_limit && !done) {
        final_answer_pluser = 0
        while (num >= min) {
            final_answer_pluser += 1
            num -= min
            runtime += 1;
        }
        /*zum++;
        if (zum == 3) {
            final_answer += " "
            zum = 0
        }*/
        final_answer += final_answer_pluser
        if (num != 0)
        if (first) {
            final_answer += "."
            first = false
            num *= 10
        }
        else
        num *= 10
        else
        done = true
    }
    return final_answer
}
function divideS(a,b) {
    return a/b
}