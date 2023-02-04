function main() {
    console.log("Page started!")
}
function show_answer(num) {
    if (num == 1) document.getElementById("question" + num).textContent = "x = 0.99999...\n10x = 9.99999...\n10x - x = 9.99999... - 0.99999...\n9x = 9 => 9x/9 = 9/9\n1 = 1 = 0.99999..."
    if (num == 2) document.getElementById("question" + num).textContent = "the answer is 0.000001002003004005006007008009...995996997999\nbut whats so special about this you might ask? look again\n0.000 001 002 003 004 005 006 007 008 009...995 996 997 999\nit works with every whole number less than 1000 except the 998\nBUT the coolest part is that it repeats!!!!!\n0.000001002003004...997999000001002003004...997999000001002003004...997999.......\nYou can try it your own in https://amirhossainj123.github.io/utilities/accurate"
    if (num == 3) document.getElementById("question" + num).textContent = "3 cubed plus 4 tesseracted plus 3 cubed plus 5 penteracted\nidk if my words are correctly used\nits equal to the legendary 3435, what a hard question"
    if (num == 4) document.getElementById("question" + num).textContent = "10 powered by 506 - 10 powered by 506/2 - 1 = prime\nso basically (10 powered by 506) - (10 powered by 253) - 1\nto write the answer just write 9, 253 times then write a single 8 then write 9, 252 times\nhope it helps"
    if (num == 5) document.getElementById("question" + num).textContent = "Well umm 73939133 is prime\nalso 7393913 is prime too\nsomehow 739391 is also prime\nstrangly 73939 is also prime\n7393 is ALSO PRIME\n739 is prime too bruh\n73 is prime too ;s\n7 is prime obviously too dang"
    if (num == 6) document.getElementById("question" + num).textContent = "what if I just pull the numbers down\nthats a good way isnt it?\n2 powered by 5 times 9 powered by 2\nplus a lil rope and me is equal to 2592\n2 powered by 5 times 9 powered by 2 is equal to 2592!"
    if (num == 7) document.getElementById("question" + num).textContent = "so ye just use this pattern and go on\n1/(1 squared) plus 1/(2 squared) plus 1/(3 squared) plus 1/(4 squared) plus 1/(5 squared) plus 1/(6 squared) plus 1/(7 squared) and so on...\nis equal to (pi squared)/6 the more you go the more accurate it gets"
    if (num == 8) document.getElementById("question" + num).textContent = "142857 is a cyclic number :D soo\n142857*2 is equal to 285714 which still has the same numbers\n142857*3 is equal to 428571 still the same\n142857*4 is equal to 571428 still the same\n142857*5 is equal to 714285 still\n142857*6 is equal to 857142\nand at the last the great show off\n142857*7 is equal to 999999\n\noops I forgot to mention that 142 + 857 = 999\nsome how 14+28+57 = 99 DAMN"
    if (num == 9) document.getElementById("question" + num).textContent = ""
    if (num == 10) document.getElementById("question" + num).textContent = ""
    if (num == 11) document.getElementById("question" + num).textContent = ""
    if (num == 12) document.getElementById("question" + num).textContent = ""
}
function hide_answer(num) {
    if (num == 1) document.getElementById("question" + num).textContent = ""
    if (num == 2) document.getElementById("question" + num).textContent = ""
    if (num == 3) document.getElementById("question" + num).textContent = ""
    if (num == 4) document.getElementById("question" + num).textContent = ""
    if (num == 5) document.getElementById("question" + num).textContent = ""
    if (num == 6) document.getElementById("question" + num).textContent = ""
    if (num == 7) document.getElementById("question" + num).textContent = ""
    if (num == 8) document.getElementById("question" + num).textContent = ""
    if (num == 9) document.getElementById("question" + num).textContent = ""
    if (num == 10) document.getElementById("question" + num).textContent = ""
    if (num == 11) document.getElementById("question" + num).textContent = ""
    if (num == 12) document.getElementById("question" + num).textContent = ""
}